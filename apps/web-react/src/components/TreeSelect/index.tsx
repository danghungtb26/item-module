import React from 'react'
import { TreeSelect as ANTreeSelect, TreeSelectProps } from 'antd'

const { TreeNode } = ANTreeSelect
const TreeSelect: React.FC<TreeSelectProps> = ({ treeData = [], value = [], ...props }) => {
  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        item.disabled = true
        return (
          <TreeNode key={item.key} title={item.title} value={item.value} disabled={item.disabled}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} key={item.key} title={item.title} value={item.value} />
    })
  return <ANTreeSelect {...props}>{renderTreeNodes(treeData)}</ANTreeSelect>
}

export default TreeSelect
