<template>
  <div id="app">
    <ul class="users">
      <li
        v-for="user in users"
        :key="user.id"
        class="user"
      >
        <img :src="user.avatar" alt="Avatar" />
        <h3>{{ user.name }}</h3>
      </li>
    </ul>
    <div
      v-if="isLoading"
      class="loading-spinner"
    >
      <div class="content">
        <div class="text">
          Loading dem faces
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue';

  const delay = ms => new Promise(r => setTimeout(r, ms));

  const getUsers = async () => {
    await delay(2000);
    return {
      data: [
        {
          name: 'Bob',
          avatar: 'https://pickaface.net/gallery/avatar/jarroddinham52293fcd09e8f.png',
        },
        {
          name: 'Dude',
          avatar: 'https://pickaface.net/gallery/avatar/biscuit55f7c457df848.png',
        },
        {
          name: 'Mr Ugly',
          avatar: 'https://pickaface.net/gallery/avatar/MsMattheis52ebff63865e8.png'
        }
      ]
    }
  }

  export default {
    setup() {
      const users = ref([]);
      const isLoading = ref(false);

      // const limit = 5;

      const fetchUsers = async () => {
        isLoading.value = true;
        const response = await getUsers();
        users.value = [
          ...users.value,
          ...response.data,
        ];
        isLoading.value = false;
      };

      const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          fetchUsers();
        }
      }

      onBeforeMount(() => {
        fetchUsers();
      });

      onMounted(() => {
        window.addEventListener('scroll', handleScroll);
      });

      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
      });
    
    return {
      users,
      isLoading,
    }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .users {
    padding-bottom: 5rem;
  }

  .user {
    list-style: none;
  }

  .loading-spinner {
    padding-bottom: 3rem;
  }

  .loading-spinner:after {
    overflow: hidden;
    display:inline-block;
    vertical-align: bottom;
    animation: ellipsis steps(4, end) 900ms infinite;
    content: "\2026";
    width: 0px;
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }
</style>

