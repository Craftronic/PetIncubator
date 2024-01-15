import { getBasePath } from "./getBasePath";

export const restAction = (entity: entityConfig, action: string) => {
  fetch(`${getBasePath()}/${entity.domain}/${entity.id}/${action}`, {
    method: "POST",
    body: "true",
  }).then((r) => {
    console.log(r);
  });
}