<template lang="pug">
  .new-container
    form.new-form(@submit.prevent='submitNewAnime')
      h1.title
        | Nuevo anime
      .title-field
        label.label
          | Título
        input.input(v-model='title')
        span.error-msg(v-show='titleError')
          | Hubo un error
      .row.space-between
        .column
          .review-field.row
            label.label
              | Review
            select.review-select(v-model='review')
              option(disabled value='')
                | Elegir valoración
              option(v-for='review in reviewValues' :key='review.id' :value='review.value')
                | {{ review.value }}
          span.error-msg(v-show='reviewError')
            | Hubo un error
        .column
          .status-field.column
            label.label
              | Estado
            select.status-select(v-model='status')
              option(disabled value='')
                | Elegir estado
              option(v-for='status in seenStatus' :key='status.id' :value='status.value')
                | {{ status.optionLabel }}
          span.error-msg(v-show='statusError')
            | Hubo un error
      .description-field
        label.label
          | Descripción
        textarea.description-input(v-model='description')
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
      title: 'h',
      review: '',
      status: '',
      description: '',
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
    },
    description: {
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
  background: url('../assets/green-plain.jpg') no-repeat center center;

  .new-form {
    background: $white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    min-width: 460px;

    .title-field {
      @extend .column;
      margin-bottom: 20px;

      .label {
        margin-bottom: 10px;
      }

      .input {
        @extend .base-input;
      }
    }

    .review-field {
      @extend .row;
      @extend .middle;
      margin-bottom: 20px;

      .label {
        margin-right: 10px;
      }

      .review-select {
        @extend .base-input;
      }
    }

    .status-field {
      @extend .row;
      @extend .middle;
      margin-bottom: 20px;

      .label {
        margin-right: 10px;
      }

      .status-select {
        @extend .base-input;
      }
    }

    .description-field {
      margin-bottom: 20px;

      .label {
        margin-bottom: 10px;
      }

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
  }
}
</style>
