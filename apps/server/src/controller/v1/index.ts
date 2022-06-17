import { CategoryController } from './category'
import { ItemController } from './item'
import { ItemStatusController } from './item/status'
import { ItemTypeController } from './item/type'

namespace ControllerV1 {
  export class Category extends CategoryController {}

  export namespace Item {
    export class Item extends ItemController {}

    export class Status extends ItemStatusController {}

    export class Type extends ItemTypeController {}
  }
}

export default ControllerV1
