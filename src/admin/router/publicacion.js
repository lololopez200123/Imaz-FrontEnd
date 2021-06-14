import Publicaciones from "@/admin/views/Publicacion/Index";
import NewPublicacion from "@/admin/views/Publicacion/New";
import EditPublicacion from "@/admin/views/Publicacion/Edit";
import ShowPublicacion from "@/admin/views/Publicacion/Show";
import DeletePublicacion from "@/admin/views/Publicacion/Delete";

export default function() {
  return [
    {
      path: "/publicaciones",
      name: "Publicaciones",
      component: Publicaciones,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/publicaciones/new",
      name: "NewPublicacion",
      component: NewPublicacion,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/publicaciones/:id/edit",
      name: "EditPublicacion",
      component: EditPublicacion,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/publicaciones/:id/delete",
      name: "DeletePublicacion",
      component: DeletePublicacion,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/publicaciones/:id",
      name: "ShowPublicacion",
      component: ShowPublicacion,
      meta: {
        requiresLogin: true
      }
    }
  ];
}
