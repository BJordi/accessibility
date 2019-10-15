<template lang="pug">
  .home-container
    .content
      h1.title
        | Anime list
      .search-container
        input.search-input(v-model='searchValue' @keypress.enter='search')
        button.search-button(id='button-search' type='button' @click='search')
          img.icon(src='../assets/search-icon.svg' alt='Buscar')
      h2.list-title
        | Mi lista
      .list-container
        template(v-if='filteredList.length > 0')
          button.card(v-for='anime in filteredList' :key='anime.id' @click='goToDetail(anime.id)')
            img.image(:src='anime.image')
            .description
              h3.card-title
                | {{ anime.name }}
              span
                | {{ anime.reviewStars }} / 10
        template(v-else)
          .empty-container
            img.image(src='../assets/add-to-list.svg' alt='Lista vacía')
            h3.empty-title
              | ¿Qué esperas?
            span.empty-subtitle
              | ¡Empieza a agregar animes a tu lista!
</template>

<script>
import { routes } from '../router'
import { db } from '../firebase'

export default {
  name: 'home',
  data () {
    return {
      searchValue: '',
      animeList: []
    }
  },
  computed: {
    filteredList () {
      return this.animeList
        .filter(item => item.name.toLowerCase().includes(this.searchValue.toLowerCase()))
        .sort((a, b) => a.name > b.name)
    }
  },
  mounted () {
    db.collection('anime').get().then(querySnapshot => {
      querySnapshot.forEach(doc => this.animeList.push(doc.data()))
    })
  },
  methods: {
    search () {
      console.log('Acabo de buscar: ' + this.searchValue)
    },
    goToDetail (id) {
      this.$router.push({ name: routes.detail, params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/variables/colors.scss';
@import 'src/scss/commons/miscellaneous';

.home-container {
  @extend .main-container;
  background: url('../assets/lake-path.jpg') no-repeat center center;

  .content {
    background: $white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 30px;

    .search-container {
      align-items: center;
      border: 2px solid $dark-gray;
      border-radius: 10px;
      display: flex;
      margin-bottom: 30px;
      padding: 5px 10px;

      .search-input {
        background: transparent;
        color: $black;
        font-size: 1rem;
        line-height: 1.75rem;
        width: 100%;
      }

      .search-button {
        cursor: pointer;
      }
    }

    .list-title {
      font-size: 2rem;
      line-height: 2.5rem;
      margin-bottom: 15px;
    }

    .list-container {
      background: $white;
      height: 500px;
      overflow-y: scroll;

      .card {
        border: 1px solid $light-gray;
        border-radius: 10px;
        display: flex;
        overflow: hidden;
        transition: box-shadow 0.3s;
        width: 100%;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &:hover {
          box-shadow: 0 4px 8px 0 rgba(12, 0, 51, 0.1);

          .card-title {
            color: $blue;
          }
        }

        .image {
          height: 100px;
          margin-right: 15px;
          max-width: 100px;
          width: 100%;
        }

        .description {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          padding: 5px 0;
          width: 100%;

          .card-title {
            font-size: 1.25rem;
            margin-bottom: 10px;
          }
        }
      }

      .empty-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;

        .image {
          height: 100px;
          margin-bottom: 40px;
          width: 100px;
        }

        .empty-title {
          font-size: 1.75rem;
          font-weight: bold;
          line-height: 2.25rem;
        }

        .empty-subtitle {
          font-size: 1.5rem;
          line-height: 2.2rem;
        }
      }
    }
  }
}
</style>
