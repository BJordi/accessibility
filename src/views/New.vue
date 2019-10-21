<template lang="pug">
  .new-container
    form.new-form(@submit.prevent='submitNewAnime')
      h1.title
        | Nuevo anime
      .title-field
        label.label(for='new-title')
          | Título
        input.input(v-model='title' id='new-title' name='new-title')
        transition(name='fade')
          span.error-msg(v-show='titleError' role='log' aria-live='polite')
            | Este campo es obligatorio
      .selects-container
        .review-field
          label.label(for='new-review')
            | Review
          select.review-select(v-model='review' id='new-review' name='new-review')
            option(disabled value='')
              | Elegir valoración
            option(v-for='review in reviewValues' :key='review.id' :value='review.value')
              | {{ review.value }}
          transition(name='fade')
            span.error-msg(v-show='reviewError' role='log' aria-live='polite')
              | El valor debe estar entre 1 y 10
        .status-field
          label.label(for='new-status')
            | Estado
          select.status-select(v-model='status' id='new-status' name='new-status')
            option(disabled value='')
              | Elegir estado
            option(v-for='status in seenStatus' :key='status.id' :value='status.value')
              | {{ status.optionLabel }}
          transition(name='fade')
            span.error-msg(v-show='statusError' role='log' aria-live='polite')
              | Este campo es obligatorio
      .description-field
        label.label(for='new-description')
          | Descripción
        textarea.description-input(v-model='description' id='new-description' name='new-description')
      .link-field
        label.label(for='new-link')
          | Link
        input.input(v-model='link' id='new-link' name='new-link')
      button.main-button(type='submit')
        | Crear
</template>

<script>
import { required, between } from 'vuelidate/lib/validators'

import Navbar from '@/components/Navbar.vue'

import { reviewValues, seenStatus } from '../utils/constants'

export default {
  name: 'new',
  components: {
    Navbar
  },
  data () {
    return {
      title: '',
      review: '',
      status: '',
      description: '',
      link: '',
      formHasError: false,
      reviewValues,
      seenStatus
    }
  },
  validations: {
    title: {
      required
    },
    review: {
      between: between(0, 10)
    },
    status: {
      required
    }
  },
  computed: {
    titleError () {
      return this.formHasError && !this.$v.title.required
    },
    reviewError () {
      return this.formHasError && !this.$v.review.between
    },
    statusError () {
      return this.formHasError && !this.$v.status.required
    }
  },
  methods: {
    submitNewAnime () {
      if (!this.$v.$error) {
        this.formHasError = true
      } else {
        this.formHasError = false
        console.log('Creé un nuevo anime')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/commons/display';
@import 'src/scss/commons/miscellaneous';

.new-container {
  @extend .main-container;
  background: url('../assets/green-plain.jpg') $dark-gray no-repeat center center;

  .new-form {
    background: $white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    max-width: 460px;
    padding: 30px;
    width: 100%;

    .title-field {
      @extend .column;
      margin-bottom: 20px;

      .input {
        @extend .base-input;
      }
    }

    .selects-container {
      @extend .row;
      @extend .space-between;
      @extend .top;

      .review-field,
      .status-field {
        @extend .column;
        margin-bottom: 20px;
        width: 160px;

        .review-select,
        .status-select {
          @extend .base-input;
        }
      }
    }

    .description-field {
      margin-bottom: 20px;

      .description-input {
        @extend .base-input;
        resize: none;
        width: 100%;
      }
    }

    .label {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .error-msg {
      margin-top: 5px;
    }

    .main-button {
      align-self: flex-end;
      width: 120px;
    }
  }

  .label {
    margin-bottom: 5px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}

@media screen and (max-width: 390px) {
  .new-container {
    .new-form {
      .selects-container {
        flex-direction: column;

        .review-field,
        .status-field {
          width: 100%;
        }
      }
    }
  }
}
</style>
