/*
 * @FilePath: /nx-admin/src/pages/Posts/list.tsx
 * @author: Wibus
 * @Date: 2022-07-15 18:45:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-22 21:39:46
 * Coding With IU
 */
import { Button, Loading, Modal, Table, useClasses, useModal } from "@geist-ui/core";
import { useState } from "react";
import { message } from "react-message-popup";
import { Link, useLocation } from "react-router-dom"
import { useMount } from "react-use"
import Dashboards from "../../components/widgets/Dashboards"
import { NxPage } from "../../components/widgets/Page"
import { useStore } from "../../hooks/use-store";
import { BasicPage } from "../../types/basic"
import { apiClient } from "../../utils/request"

export const Posts: BasicPage = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)

  const [article, setArticle] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const { visible, setVisible, bindings } = useModal()
  const [deleteIndex, setDeleteIndex] = useState<number>(-1)

  useMount(async () => {
    await apiClient.get('/posts', null, [{ key: "page", value: 1 }, { key: "size", value: 10 }]).then(res => {
      console.log(res)
      const { data } = res as any
      const content = new Array()
      for (let index of Object.keys(data)) {
        content.push({
          id: data[index].id,
          title: data[index].title,
          category: data[index].category.name,
          tags: data[index].tags.length ? data[index].tags.toString() : '',
          read: data[index].count !== undefined && data[index].count.read !== undefined ? data[index].count.read : "0",
          like: data[index].count !== undefined && data[index].count.like !== undefined ? data[index].count.like : "0",
          created: data[index].created.split('T')[0],
          modified: data[index].modified ? data[index].modified.split('T')[0] : '-',
        })
      }
      setArticle(content)
      setLoading(false)
    })
  })

  const removeHandler = () => {
    if (deleteIndex === -1) {
      message.error("???????????????????????????")
      return
    }
    setArticle(article.filter((_, index) => index !== deleteIndex))
    message.success(`${article[deleteIndex].title} ????????????`)
    setDeleteIndex(-1)
    setVisible(false)
  }

  const renderAction = (value, rowData, index) => {
    return (
      <Button type="error" auto scale={1 / 3} font="12px" onClick={() => { setVisible(true); setDeleteIndex(index) }}>Remove</Button>
    )
  }

  const renderTitle = (value, rowData, index) => {
    return (
      <Link 
      style={{
        padding: 0
        }} 
      onClick={() => { setVisible(true); setDeleteIndex(index); }}
      to={`/posts/edit/${article[index].id}`}
      >
        {value}
      </Link>
    )
  }

  return (
    <NxPage title={"Posts"}>
      <Dashboards.Container className="lg:grid flex flex-col" gridTemplateColumns='1fr'>
        <Dashboards.Area className={useClasses("overflow-x-hidden")} style={{overflow: "auto"}}>
          {!loading ? (<>
            <Table data={article}>
              <Table.Column label="??????" prop="title" render={renderTitle} />
              <Table.Column label="??????" prop="category" />
              <Table.Column label="??????" prop="tags" />
              <Table.Column label="?????????" prop="read" />
              <Table.Column label="?????????" prop="like" />
              <Table.Column label="?????????" prop="created" />
              <Table.Column label="?????????" prop="modified" />
              <Table.Column label="??????" prop="action" render={renderAction} />
            </Table>

          </>) : (<Loading />)}
          <Modal {...bindings}>
            <Modal.Title>????????????</Modal.Title>
            <Modal.Subtitle>
              ?????????????????????
            </Modal.Subtitle>
            <Modal.Action passive onClick={() => setVisible(false)}>??????</Modal.Action>
            <Modal.Action onClick={removeHandler}>??????</Modal.Action>
          </Modal>
        </Dashboards.Area>
      </Dashboards.Container>
    </NxPage>
  )
}