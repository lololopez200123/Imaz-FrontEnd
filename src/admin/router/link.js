import Links from "@/admin/views/Link/Index";
import NewLink from "@/admin/views/Link/New";
import EditLink from "@/admin/views/Link/Edit";
import ShowLink from "@/admin/views/Link/Show";
import DeleteLink from "@/admin/views/Link/Delete";

export default function() {
  return [
    {
      path: "/links",
      name: "Links",
      component: Links,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/links/new",
      name: "NewLink",
      component: NewLink,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/links/:id/edit",
      name: "EditLink",
      component: EditLink,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/links/:id/delete",
      name: "DeleteLink",
      component: DeleteLink,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: "/links/:id",
      name: "ShowLink",
      component: ShowLink,
      meta: {
        requiresLogin: true
      }
    }
  ];
}
