<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ChessBoard from '@/components/ChessBoard.vue';
</script>

<template>
  <main>
    <section class="container">
      <ChessBoard />
      <SideBar />
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 16px;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;

  @media (max-width: 880px) {
    flex-direction: column;
    align-items: center;
  }
}
</style>
