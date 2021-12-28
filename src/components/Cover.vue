<template>
  <div class="cover" />
</template>

<script>
export default {
  name: 'Cover',
}
</script>

<style>
.cover{
  background-image: url('../assets/img/background.jpg');
  background-attachment: scroll;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-position-y: center;
  z-index: -1;
}
@media (min-width: 800px)
{
  .cover
   {
    background-position-y: inherit;
   }
}
@media (min-width: 1100px)
{
  .cover
   {
    background-position-y: inherit;
   }
}
.bm-burger-button{
  display: none;
}
</style>
