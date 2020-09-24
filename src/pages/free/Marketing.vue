<template>
  <q-page>
    <div class="q-pt-lg fit row wrap justify-center items-start content-start">
      <input
        type="radio"
        name="choice"
        id="spaces"
        checked="checked"
      /><input
        type="radio"
        name="choice"
        id="tabs"
      /><label for="tabs"></label><label for="spaces"></label>
      <div class="card card--answer card--tabs">
        <div class="card__content">Meus Eventos</div>
        <br>
        <q-separator color="primary" />
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Reforma piscina Igor 20A"
          />
          <q-space />
          <i class="fas fa-angle-double-right"></i>
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Visitar"
          />
          <q-space />
          <i class="fas fa-angle-double-right"></i>
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Aniversário da Princesa"
          />
          <q-space />
          <i class="fas fa-angle-double-right"></i>
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Reforma"
          />
          <q-space />
          <i class="fas fa-angle-double-right"></i>
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Viagem"
          />
          <q-space />
          <i class="fas fa-angle-double-right"></i>
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="teste"
          />
          <q-space />
          <i class="fas fa-angle-double-right"></i>
        </q-toolbar>
        <br>

        <!-- <q-separator color="primary" /> -->
        <!-- <br>
        <span>Reforma piscina Igor 20A</span>
        <br>
        <span>Visitar</span>
        <br>
        <span>Visita</span>
        <br>
        <span>Visita</span>
        <br>
        <span>Aniversário da minha Princesa</span>
        <br>
        <span>Teste</span>
        <br>
        <span>Viagem</span>
        <br>
        <span>Visita</span>
        <br>
        <span>Teste</span>
        <br>
        <span>Tarde de jogos</span><br>
        <span>Visita</span><br>
        <span>Reforma</span><br>
        <span>Visita</span> <br>
        <span>Visita</span>
        <br>
        <span>Visita</span>
        <br>
        <span>Visita</span>
        <br>
        <span>Visita</span>
        <br> -->
        <span>...</span>
        <footer class="text-primary card__footer"><img src="http://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Small.png" />
          <span>Condominio Novo Horizonte</span>
        </footer>
      </div>
      <div class="card card--answer card--spaces">
        <div class="card__content">Minhas Chaves</div>
        <br>
        <q-separator color="primary" />
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Entrada Pedestres"
          />
          <q-space />
          <Lock class="q-pr-md" />
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Entrada Veículos"
          />
          <q-space />
          <Lock class="q-pr-md" />
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Entrada exemplo 1"
          />
          <q-space />
          <Lock class="q-pr-md" />
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Entrada exemplo 2"
          />
          <q-space />
          <Lock class="q-pr-md" />
        </q-toolbar>
        <br>
        <q-toolbar class="bg-black text-white shadow-2 rounded-borders">
          <q-btn
            flat
            label="Entrada exemplo 3"
          />
          <q-space />
          <Lock class="q-pr-md" />
        </q-toolbar>
        <br>
        <footer class="text-primary card__footer"><img src="http://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Small.png" />
          <span>Condominio Novo Horizonte</span>
        </footer>
      </div>
    </div>
  </q-page>
</template>

<script>
import Marketing from '../free/Marketing'
import Lock from './Lock'

export default {
  name: '',
  components: {
    Marketing,
    Lock
  }
}
</script>

<style scoped>
/* * {
  box-sizing: border-box;
} */

/* body,
html {
  align-items: center;
  background: #db0a5b;
  display: flex;
  font-size: 10px;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  padding: 0;
} */

input {
  visibility: hidden;
}
/*
@media (min-width: 768px) {
  body,
  html {
    font-size: 14px;
  }
}

@media (min-width: 992px) {
  body,
  html {
    font-size: 16px;
  }
} */

.card {
  /* margin: auto; */
  background: #333;
  border-radius: 1.25rem;
  color: #fff;
  filter: drop-shadow(5px 5px 5px #000);
  flex-shrink: 0;
  font-family: sans-serif;
  font-size: 1.5rem;
  font-weight: bolder;
  /* height: 28rem; */
  height: 88.5%;
  padding: 2.5rem;
  /* overflow: hidden; */
  position: absolute;
  /* position: relative;
  float: top; */
  transition: transform 0.25s ease-out;
  width: 94%;
}

/* .card:nth-of-type(1) {
  transform: translate(-40%, 0) rotate(-15deg);
} */

.card__footer {
  align-items: center;
  bottom: 30px;
  display: flex;
  font-size: 1.2rem;
  left: 2.5rem;
  position: absolute;
  right: 2.5rem;
}

.card__footer img {
  height: 2rem;
  margin-right: 6px;
  width: 2rem;
}

.card--answer {
  color: #000;
  background: #fff;
}

#spaces:checked ~ .card--spaces {
  transform: translate(0, 35px);
  z-index: 2;
}

#spaces:checked ~ .card--tabs {
  transform: translate(0, -35px);
  z-index: 1;
}

#spaces:checked ~ label[for="tabs"] {
  z-index: 3;
}

#tabs:checked ~ .card--tabs {
  transform: translate(0, 35px);
  z-index: 2;
}

#tabs:checked ~ .card--spaces {
  transform: translate(0, -35px);
  z-index: 1;
}

#tabs:checked ~ label[for="spaces"] {
  z-index: 3;
}

label {
  /* height: 33.6rem; */
  margin-top: -30px;
  height: 6rem;
  position: absolute;
  /* transform: translate(0, 10%); */
  width: 90%;
}
</style>
