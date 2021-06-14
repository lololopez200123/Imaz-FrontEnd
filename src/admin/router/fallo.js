import Fallos from "@/admin/views/Fallo/Index";
import NewFallo from "@/admin/views/Fallo/New";
import EditFallo from "@/admin/views/Fallo/Edit";
import ShowFallo from "@/admin/views/Fallo/Show";
import DeleteFallo from "@/admin/views/Fallo/Delete";

export default function() {
  return [
    {
      path: "/fallos",
      name: "Fallos",
      component: Fallos,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/fallos/new",
      name: "NewFallo",
      component: NewFallo,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/fallos/:id/edit",
      name: "EditFallo",
      component: EditFallo,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/fallos/:id/delete",
      name: "DeleteFallo",
      component: DeleteFallo,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/fallos/:id",
      name: "ShowFallo",
      component: ShowFallo,
      meta: {
        requiresLogin: true
      }
    }
  ];
}
