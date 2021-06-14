import Categorias from "@/admin/views/Categoria/Index";
import NewCategoria from "@/admin/views/Categoria/New";
import EditCategoria from "@/admin/views/Categoria/Edit";
import ShowCategoria from "@/admin/views/Categoria/Show";
import DeleteCategoria from "@/admin/views/Categoria/Delete";

export default function() {
  return [
    {
      path: "/categorias",
      name: "Categorias",
      component: Categorias,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/categorias/new",
      name: "NewCategoria",
      component: NewCategoria,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/categorias/:id/edit",
      name: "EditCategoria",
      component: EditCategoria,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/categorias/:id/delete",
      name: "DeleteCategoria",
      component: DeleteCategoria,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/categorias/:id",
      name: "ShowCategoria",
      component: ShowCategoria,
      meta: {
        requiresLogin: true
      }
    }
  ];
}
