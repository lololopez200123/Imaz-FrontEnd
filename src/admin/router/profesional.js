import Profesionales from "@/admin/views/Profesional/Index";
import NewProfesional from "@/admin/views/Profesional/New";
import EditProfesional from "@/admin/views/Profesional/Edit";
import ShowProfesional from "@/admin/views/Profesional/Show";

export default function() {
  return [
    {
      path: "/profesionales",
      name: "Profesionales",
      component: Profesionales,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/profesionales/new",
      name: "NewProfesional",
      component: NewProfesional,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/profesionales/:id/edit",
      name: "EditProfesional",
      component: EditProfesional,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/profesionales/:id",
      name: "ShowProfesional",
      component: ShowProfesional,
      meta: {
        requiresLogin: true
      }
    }
  ];
}
