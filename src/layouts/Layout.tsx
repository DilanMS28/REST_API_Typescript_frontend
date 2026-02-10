import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <p>Desde el layout</p>
      <Outlet />
    </div>
  )
}
