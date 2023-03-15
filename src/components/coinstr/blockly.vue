<template lang='pug'>
#coinstrBlockly
    p This is an encapsulation for blockly
    #blocklyContainer(style='height: 480px width: 600px')
</template>

<script setup>
import { onMounted, onUpdated, defineExpose, ref } from 'vue'
import * as Blockly from 'blockly'

const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Control Flow',
      contents: [
        {
          kind: 'block',
          type: 'and'
        },
        {
          kind: 'block',
          type: 'or'
        },
        {
          kind: 'block',
          type: 'tresh'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Leaves',
      contents: [
        {
          kind: 'block',
          type: 'pk'
        },
        {
          kind: 'block',
          type: 'older'
        },
        {
          kind: 'block',
          type: 'after'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Keys',
      contents: [
        {
          kind: 'block',
          type: 'my_key'
        },
        {
          kind: 'block',
          type: 'key'
        }
      ]
    }
  ]
}

onMounted(() => {
  loadBlockly()
})

// onUpdated(() => {
//   loadBlockly()
// })

const readBlockly = () => {
  const workspace = Blockly.getMainWorkspace()
  const allBlocks = workspace.getAllBlocks()
  // console.log('beginBlock', beginBlock)
  // allBlocks.forEach((block) => {
  //   console.log('=====================================')
  //   console.log('block type:', block.type)
  //   console.log('block id:', block.id)
  //   console.log('block input names:', block.inputList.map((input) => input.name))
  //   console.log('statementInputCount:', block.statementInputCount)
  //   console.log('statementInputCount2:', block.getFieldValue('Threshold'))
  //   console.log('block next block:', block.getNextBlock() ? block.getNextBlock().type : null)
  //   console.log('block previous block:', block.getPreviousBlock() ? block.getPreviousBlock().type : null)
  //   console.log('block parent block:', block.getParent() ? block.getParent().type : null)
  //   console.log('block child blocks:', block.getChildren().map((child) => child.type))
  //   console.log('block', block)
  // })
  const beginBlock = allBlocks.find(block => block.type === 'begin')
  const children = beginBlock.getChildren()
  const policy = {
    blockType: beginBlock.type,
    children: beginBlock.getChildren()
  }
  const tree = readTree(beginBlock)
  console.log('============')
  console.log('tree', tree)
  printTree(tree)
  console.log('============')
  return beginBlock
}

function readTree (beginBlock) {
  // temporalBlocksInfo = []
  const childrenList = {
    blockId: beginBlock.id,
    blockType: beginBlock.type,
    children: readChildren(beginBlock)
  }

  return childrenList
}

function printTree (node, indentLevel = 0) {
  const indent = '=' + '=='.repeat(indentLevel)
  console.log(`${indent}${node.blockType}: Id: ${node.blockId} | parentId: ${node.parentId} | nextBlock: ${node.nextBlockId} | parentNext: ${node.parentNextBlockId}`)
  if (node.children.length > 0) {
    node.children.forEach(child => {
      printTree(child, indentLevel + 1)
    })
  }
}

const temporalBlocksInfo = []

function readChildren (block, parentBlock) {
  const children = block.getChildren()
  const childrenList = []
  if (children) {
    children.forEach(child => {
      const parentBlockId = child.parentBlock_?.id
      // const workspace = Blockly.getMainWorkspace()
      // const parentBlock = workspace.getBlockById(parentBlockId)
      const parentNextBlockId = parentBlock?.nextBlockId
      // console.log('prentBlock', { parentBlockId, parentBlock })
      const childData = {
        blockId: child.id,
        parentId: parentBlockId,
        blockType: child.type,
        nextBlockId: child.getNextBlock()?.id,
        value: child.getFieldValue('VALUE'),
        parentNextBlockId,
        children: []
      }
      childData.children = childData.children.concat(readChildren(child, childData))
      const workspace = Blockly.getMainWorkspace()
      if (childData.nextBlockId !== undefined) {
        // debugger
        const nextBlock = workspace.getBlockById(childData.nextBlockId)
        const nextData = {
          blockId: nextBlock.id,
          parentId: parentBlockId,
          blockType: nextBlock.type,
          nextBlockId: nextBlock.getNextBlock()?.id,
          value: nextBlock.getFieldValue('VALUE'),
          parentNextBlockId,
          children: []
        }
        // debugger
        nextData.children = readChildren(nextBlock, parentBlock)
        // const newChildren = parentBlock.children.concat([nextData])
        // parentBlock.children = newChildren
        childrenList.push(nextData)
        // childData.children = readChildren(nextBlock, parentBlock)
      }
      // if (block.type === 'pk') debugger
      if (childData.blockId !== parentNextBlockId) {
        childrenList.push(childData)
      }
    })
  }
  return childrenList
}

function findBlock (node, blockId) {
  if (node.children?.length > 0) {
    node.children.forEach(child => {
      if (node.blockId === blockId) return node
      findBlock(node, blockId)
    })
  }
}

const loadBlockly = () => {
  Blockly.Blocks.text.newQuote_ = function () {
    return this.SINGLE_QUOTE ? Blockly.Msg.TEXT_APPEND_VARIABLE : Blockly.Msg.TEXT_APPEND_TEXT
  }

  // Set AND custom block
  Blockly.Blocks.and = {
    init: function () {
      this.setColour(230)
      this.appendStatementInput('A')
        .setCheck('Policy')
      this.appendDummyInput()
        .appendField('AND')
      this.appendStatementInput('B')
        .setCheck('Policy')
      this.setInputsInline(false)
      this.setPreviousStatement(true, 'Policy')
      this.setNextStatement(true, 'Policy')
      this.setTooltip('Requires both sub-policies to be satisfied')
    }
  }

  // Set OR custom block
  Blockly.Blocks.or = {
    init: function () {
      this.setColour(230)
      this.appendDummyInput()
        .appendField('Weight')
        .appendField(new Blockly.FieldNumber(1, 0, Infinity, 1), 'A_weight')
        .appendField(this.newQuote_())
        .appendField(new Blockly.FieldLabelSerializable(' '), 'SPACE')
      this.appendStatementInput('A')
        .setCheck('Policy')
      this.appendDummyInput()
        .appendField('OR')
      this.appendDummyInput()
        .appendField('Weight')
        .appendField(new Blockly.FieldNumber(1, 0, Infinity, 1), 'B_weight')
        .appendField(this.newQuote_())
        .appendField(new Blockly.FieldLabelSerializable(' '), 'SPACE')
      this.appendStatementInput('B')
        .setCheck('Policy')
      this.setPreviousStatement(true, 'Policy')
      this.setNextStatement(true, 'Policy')
      this.setInputsInline(false)
      this.setTooltip('Requires either one of the two sub-policies to be satisfied. Weights can be used to indicate the relative probability of each sub-policy')
    },
    newQuote_: Blockly.Blocks.text.newQuote_
  }

  // Set TRESH custom block
  Blockly.Blocks.tresh = {
    init: function () {
      this.setColour(230)
      this.appendDummyInput()
        .appendField('Threshold')
        .appendField(new Blockly.FieldNumber(1, 1, Infinity, 1), 'Threshold')
        .appendField(this.newQuote_())
        .appendField(new Blockly.FieldLabelSerializable(' '), 'SPACE')
      this.appendStatementInput('Statements')
        .setCheck('Policy')
      this.setPreviousStatement(true, 'Policy')
      this.setNextStatement(true, 'Policy')
      this.setInputsInline(false)
      this.setTooltip("Creates a threshold element (m-of-n), where the 'm' field is manually set and 'n' is implied by the number of sub-policies added")
    },
    newQuote_: Blockly.Blocks.text.newQuote_
  }

  // Set BEGIN custom block
  Blockly.Blocks.begin = {
    init: function () {
      this.singleton = true
      this.startHat = true
      this.hat = true
      this.setColour(160)
      this.appendDummyInput()
        .appendField('Begin')
        .appendField(this.newQuote_())
        .appendField(new Blockly.FieldLabelSerializable(' '), 'SPACE')
      this.setDeletable(false)
      this.setEditable(false)
      this.setPreviousStatement(false)
      this.setNextStatement(true, 'Policy')
      this.setInputsInline(false)
      this.setTooltip('Sets the beginning of the policy')
    },
    startHat: true,
    newQuote_: Blockly.Blocks.text.newQuote_
  }

  // Set MY_KEY custom block
  Blockly.Blocks.my_key = {
    init: function () {
      this.appendDummyInput()
        .appendField('My Key')
      this.setOutput(true, 'Key')
      this.setColour(22)
      this.setTooltip('My private key')
      this.setInputsInline(false)
    }
  }

  // Set KEY custom block
  Blockly.Blocks.key = {
    init: function () {
      this.appendDummyInput()
        .appendField('Cosigner:')
        .appendField(new Blockly.FieldDropdown(this.generateOptions), 'Cosigner')
      this.setOutput(true, 'Key')
      this.setInputsInline(false)
      this.setNextStatement(false)
      this.setColour(65)
      this.setTooltip('')
      this.setHelpUrl('')
      this.extensions = ['dynamic_options']
    },
    generateOptions: function () {
      const options = [
        ['Chema', 'pk1'],
        ['Chuy', 'pk2']
      ]
      return options
    }
  }

  // Set PK custom block
  Blockly.Blocks.pk = {
    init: function () {
      this.appendValueInput('Key')
        .setCheck('Key')
        .appendField('Key')
      this.setPreviousStatement(true, 'Policy')
      this.setNextStatement(true, 'Policy')
      this.setColour(120)
      this.setTooltip('Require a signature from a given key to satisfy this fragment')
      this.setInputsInline(false)
      this.extensions = ['allow_chain_in_thresh']
    }
  }

  // Set OLDER custom block
  Blockly.Blocks.older = {
    init: function () {
      this.appendDummyInput()
        .appendField('Older')
        .appendField(new Blockly.FieldNumber(6), 'value')
      this.setPreviousStatement(true, 'Policy')
      this.setNextStatement(true, 'Policy')
      this.setColour(150)
      this.setTooltip('Add a relative timelock expressed in number of blocks')
      this.setHelpUrl('')
      this.extensions = ['allow_chain_in_thresh']
    }
  }

  // Set AFTER custom block
  Blockly.Blocks.after = {
    init: function () {
      this.appendDummyInput()
        .appendField('After')
        .appendField(new Blockly.FieldNumber(10000), 'value')
      this.setPreviousStatement(true, 'Policy')
      this.setNextStatement(true, 'Policy')
      this.setColour(150)
      this.setTooltip('Add a relative timelock expressed in absolute block height')
      this.setHelpUrl('')
      this.extensions = ['allow_chain_in_thresh']
    }
  }

  // Inject blockly settings on DOM
  const ws = Blockly.inject('blocklyContainer', { toolbox })

  // Set in workspace begin block
  const xmlText = '<xml><block type="begin"></block></xml>'
  const xml = Blockly.Xml.textToDom(xmlText)
  const workspace = Blockly.getMainWorkspace()
  Blockly.Xml.appendDomToWorkspace(xml, workspace)
  const block = workspace.getAllBlocks()
  block[0].moveBy(250, 0)
}

defineExpose({
  readBlockly
})
// -
</script>

<style lang="stylus" scoped>
#blocklyContainer
  width: 50vw
  height: 80vh
</style>
