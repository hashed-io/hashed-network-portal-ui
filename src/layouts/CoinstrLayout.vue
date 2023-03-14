<template lang="pug">
q-layout.containerLayout(container view="hHh lpR fFf")
    q-header
      q-toolbar
        q-item
          q-item-section
            q-item-label Policies
    q-page-container
      .row.justify-center
        .col-12
          q-page.q-py-md.q-px-lg
            router-view
</template>

<style lang="stylus" scoped>
.containerLayout
  height: 100vh
</style>
