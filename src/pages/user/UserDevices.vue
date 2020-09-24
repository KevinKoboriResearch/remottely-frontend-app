<template>
  <div>
    <ul>
      <li><a href="/#/">Minhas Chaves / eventos</a></li>
      <li><a href="/#/user/devices-history">Histórico de acessos</a></li>
      <li><a href="/#">Configuracoes das chaves</a></li>
      <li><a href="/#/user/events">Notificacões</a></li>
      <li><a href="/#/user/notifications">Usuários</a></li>
      <li><a href="/#/user/profile">Meu Perfil</a></li>
      <!-- <br>
      <li><a href="#">Minhas Chaves / eventos</a></li>
      <li><a href="#">Histórico de acessos</a></li>
      <li><a href="#">Configuracoes das chaves</a></li>
      <li><a href="#">Notificacões</a></li>
      <li><a href="#">Usuários</a></li>
      <li><a href="#">Meu Perfil</a></li> -->
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Lato);

body {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #1a1e23;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: start;
  list-style-type: none;

  li {
    padding: 6px 0;

    a {
      position: relative;
      display: block;
      padding: 4px 0;
      font-family: Lato, sans-serif;
      color: #ecf0f1;
      text-decoration: none;
      text-transform: uppercase;
      transition: 0.5s;

      &::after {
        position: absolute;
        content: "";
        top: 100%;
        left: 0;
        width: 100%;
        height: 3px;
        background: #9900ff;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s;
      }

      &:hover {
        color: #95a5a6;
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
}
</style>
