import Noticias from "@/admin/views/Noticia/Index";
import NewNoticia from "@/admin/views/Noticia/New";
import EditNoticia from "@/admin/views/Noticia/Edit";
import ShowNoticia from "@/admin/views/Noticia/Show";
import DeleteNoticia from "@/admin/views/Noticia/Delete";

export default function() {
  return [
    {
      path: "/noticias",
      name: "Noticias",
      component: Noticias,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/noticias/new",
      name: "NewNoticia",
      component: NewNoticia,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/noticias/:id/edit",
      name: "EditNoticia",
      component: EditNoticia,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/noticias/:id/delete",
      name: "DeleteNoticia",
      component: DeleteNoticia,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/noticias/:id",
      name: "ShowNoticia",
      component: ShowNoticia,
      meta: {
        requiresLogin: true
      }
    }
  ];
}
