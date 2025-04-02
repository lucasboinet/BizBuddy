import { ProjectTag, Tag } from "@prisma/client";

export interface AppTag extends ProjectTag {
  tag: Tag
}