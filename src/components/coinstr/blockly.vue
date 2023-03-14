<template lang='pug'>
#coinstrBlockly
    p This is an encapsulation for blockly
    #blocklyCointainer(style='height: 480px width: 600px')
</template>

<script setup>
import { onMounted, onUpdated } from 'vue'
import Blockly from 'blockly'

const toolboxExample = {
  kind: 'flyoutToolbox',
  contents: [
    {
      kind: 'block',
      type: 'controls_if'
    },
    {
      kind: 'block',
      type: 'controls_repeat_ext'
    },
    {
      kind: 'block',
      type: 'logic_compare'
    },
    {
      kind: 'block',
      type: 'math_number'
    },
    {
      kind: 'block',
      type: 'math_arithmetic'
    },
    {
      kind: 'block',
      type: 'text'
    },
    {
      kind: 'block',
      type: 'text_print'
    }
  ]
}

const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Control Flow',
      contents: [
        {
          kind: 'block',
          type: 'custom_and'
        },
        {
          kind: 'block',
          type: 'custom_or'
        },
        {
          kind: 'block',
          type: 'custom_thresh'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Leaves',
      contents: [
        // {
        //   kind: 'block',
        //   type: 'custom_begin'
        // }
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
        },
        {
          kind: 'block',
          type: 'my_block'
        }
      ]
    }
  ]
}

onMounted(() => {
  loadBlockly()
})

onUpdated(() => {
  loadBlockly()
})

const loadBlockly = () => {
  Blockly.Blocks.text.newQuote_ = function () {
    return this.SINGLE_QUOTE ? Blockly.Msg.TEXT_APPEND_VARIABLE : Blockly.Msg.TEXT_APPEND_TEXT
  }
  Blockly.Blocks.custom_and = {
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
      this.setTooltip('Requires both sub-policies to be satisfied')
    }
  }

  Blockly.Blocks.custom_or = {
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

  Blockly.Blocks.custom_thresh = {
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
      this.setInputsInline(false)
      this.setTooltip("Creates a threshold element (m-of-n), where the 'm' field is manually set and 'n' is implied by the number of sub-policies added")
    },
    newQuote_: Blockly.Blocks.text.newQuote_
  }

  Blockly.Blocks.custom_begin = {
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
      this.setPreviousStatement(false)
      this.setNextStatement(true, 'Policy')
      this.setInputsInline(false)
      this.setTooltip('Sets the beginning of the policy')
      console.log('block', this)
    },
    startHat: true,
    newQuote_: Blockly.Blocks.text.newQuote_
  }

  Blockly.Blocks.my_key = {
    init: function () {
      this.appendDummyInput()
        .appendField('My Key')
      this.setOutput(true, 'KeyType')
      this.setColour(22)
      this.setTooltip('My private key')
      this.setInputsInline(false)
    }
  }

  Blockly.Blocks.key = {
    init: function () {
      this.appendValueInput('Key')
        .setCheck('Number')
        .appendField('%1')
      this.setOutput(true, 'KeyType')
      this.setColour(65)
      this.setTooltip("Somebody else's public key")
      this.setInputsInline(false)
      this.setPreviousStatement(null, null)
      this.setNextStatement(null, null)
      this.extensions = ['dynamic_options']
      this.updateShape_('Nuevo valors')
    },
    // Define la función para generar las opciones dinámicas
    updateShape_: function (newValue) {
      // Elimina el valor de entrada actual
      this.removeInput('Key')

      // Crea un nuevo valor de entrada con el nuevo valor
      this.appendValueInput('Key')
        .setCheck('Number')
        .appendField('%1')
        .appendField(newValue)

      // Actualiza la forma del bloque
      this.initSvg()
      this.render()
    }
  }

  Blockly.Blocks.my_block = {
    init: function () {
      this.appendDummyInput()
        .appendField('Cosigner:')
        .appendField(new Blockly.FieldDropdown(this.generateOptions), 'Cosigner')
      this.setOutput(true, 'KeyType')
      this.setColour(230)
      this.setTooltip('')
      this.setHelpUrl('')
      this.extensions = ['dynamic_options']
    },
    generateOptions: function () {
      const options = [
        ['Chema', 'pk1'],
        ['Chuy', 'pk2']
      ]
      //   var now = Date.now()
      //   for (var i = 0; i < 7; i++) {
      //     var dateString = String(new Date(now)).substring(0, 3)
      //     options.push([dateString, dateString.toUpperCase()])
      //     now += 24 * 60 * 60 * 1000
      //   }
      return options
    }
  }

  const ws = Blockly.inject('blocklyCointainer', { toolbox })

  //   console.log('custom_begin', Blockly.Blocks.custom_begin)
  //   console.log('ws', ws)
  //   console.warn('Blockly was injected', Blockly)

  // Crear el bloque custom_begin en formato XML
  const xmlText = '<xml><block type="custom_begin"></block></xml>'
  const xml = Blockly.Xml.textToDom(xmlText)

  // Agregar el bloque al área de trabajo en la posición (0, 0)
  const workspace = Blockly.getMainWorkspace()
  Blockly.Xml.appendDomToWorkspace(xml, workspace)

  const workspace2 = Blockly.getMainWorkspace()
  const block = workspace2.getAllBlocks() // Obtener el bloque por su ID
  block[0].moveBy(250, 0)
}
// -
</script>

<style lang="stylus" scoped>
#blocklyCointainer
  width: 50vw
  height: 80vh
</style>
