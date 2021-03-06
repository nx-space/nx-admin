/*
 * @FilePath: /nx-admin/src/components/widgets/Sidebar/index.tsx
 * @author: Wibus
 * @Date: 2022-07-14 16:39:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-22 14:17:32
 * Coding With IU
 */
import { Drawer, useClasses } from '@geist-ui/core'
import { Home, List, File, Link as Links, ChevronDown, Edit, Feather, Package, Trello, Settings, AlignLeft, MessageCircle, FileText } from '@geist-ui/icons'
import { ListAlphabet, Newlybuild, Page } from '@icon-park/react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from './index.module.css'

export const SidebarGroup = (props) => {
  return (
    <>
      <div className={style.sidebarItem + "  w-full flex items-center py-2 left-0 pt-8 " + style.sidebarGroup}>
        <div className={style.sidebarItemIcon + " pr-4 justify-center"} style={{
          flexBasis: "1.2rem",
        }}>
          {props.icon}
        </div>
        <div className={style.sidebarItemTitle}>
          <span>{props.title}</span>
          {/* <div className={style.action}>
            <ChevronDown />
          </div> */}
        </div>
      </div>
      <div className={style.groupContent + " block"}>
        {props.children}
      </div>
    </>
  )
}

export const SidebarGroupItem = (props) => {
  return (
    <Link className={style.sidebarItem + " w-full flex flex-row items-center py-2 left-0"} to={props.path ? props.path : "/"}>
      <div className={style.sidebarItemIcon + " pr-4 justify-center"} style={{
        flexBasis: "1.2rem",
      }}>
        {props.icon}
      </div>
      <div className={style.sidebarItemTitle}>
        <span>{props.title}</span>
      </div>
    </Link>
  )
}

export const SidebarList = (props) => {
  return (
    <div className={useClasses(style.sidebarList)}>
      {props.children}
    </div>
  )
}

export const SidebarItem = (props) => {
  const location = useLocation()
  const pathname = location.pathname
  return (
    <Link className={useClasses(style.sidebarItem, "w-full flex flex-row items-center py-2 left-0", pathname == props.path ? style.active : null)} to={props.path ? props.path : "/"}>
      <div className={useClasses(style.sidebarItemIcon, "pr-4 justify-center")} style={{
        flexBasis: "1.2rem",
      }}>
        {props.icon}
      </div>
      <div className={useClasses(style.sidebarItemTitle)}>
        <span>{props.title}</span>
      </div>
    </Link>
  )
}

export const Sidebar = (props) => {
  return (
    <div className={useClasses(style.sidebar, props.block ? "": "hidden lg:block")}>
      <div>
        <h1 className={useClasses('py-6 text-3xl font-light lg:pl-10 lg:pt-12 hidden lg:block')}>NEXT</h1>
      </div>
      <div className={useClasses("lg:ml-20 ml-10")}>
        <SidebarList>
          <SidebarItem icon={<Home />} title='?????????' path="/dashboard" />
          <SidebarItem icon={<MessageCircle />} title='??????' path="/comments" />
          <SidebarItem icon={<Links />} title='??????' path="/links" />
        </SidebarList>
        <SidebarGroup icon={<Edit />} title='??????' path="/posts">
          <SidebarGroupItem icon={<List />} title='????????????' path="/posts/" />
          <SidebarGroupItem icon={<Feather />} title='??????????????????' path="/posts/edit" />
        </SidebarGroup>
        <SidebarGroup icon={<FileText />} title='??????' path="/pages/">
          <SidebarGroupItem icon={<ListAlphabet />} title='????????????' path="/pages/" />
          <SidebarGroupItem icon={<Newlybuild />} title='???????????????' path="/posts/edit" />
        </SidebarGroup>

        <SidebarList>
          <SidebarItem icon={<File />} title='??????' path="/files" />
          <SidebarItem icon={<Package />} title='??????' path="/plugins" />
          <SidebarItem icon={<Trello />} title='??????' path="/themes" />
          <SidebarItem icon={<Settings />} title='????????????' path="/settings" />
        </SidebarList>
      </div>
    </div>
  );
}

export const SidebarBtn = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={useClasses("pl-6 py-5 float-right absolute lg:hidden cursor-pointer z-10")} onClick={() => { setOpen(!open) }}>
        <div className={useClasses(style.sidebarBtnIcon)}>
          <AlignLeft />
        </div>
      </div>
      <Drawer visible={open} onClose={() => { setOpen(false) }} placement="left" wrapClassName={useClasses(style.sidebar, style.sidebarPhone)}>
        <Sidebar block id={"sidebar"} />
      </Drawer>
    </>
  )
}

export const hasSide = (props: any) => {
  return (
    <div className={useClasses(style.hasSidebar)}>
      <Sidebar />
      ${props.children}
    </div>
  )
}

export default Sidebar;