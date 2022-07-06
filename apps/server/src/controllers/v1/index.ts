import { CategoryController } from './category'
import { ItemController } from './item'
import { ItemStatusController } from './item/status'
import { ItemTypeController } from './item/type'
import { AttributeController } from './item/attribute'

namespace ControllerV1 {
  export class Category extends CategoryController {}

  export namespace Item {
    export class Item extends ItemController {}

    export class Status extends ItemStatusController {}

    export class Type extends ItemTypeController {}

    export class Attribute extends AttributeController {}
  }
}

export default ControllerV1
