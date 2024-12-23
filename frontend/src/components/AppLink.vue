<template>
    <a v-if="isExternal" :href="to"><slot/></a>
    <router-link v-else :to="to"><slot/></router-link>
</template>

<script>
import { RouterLink } from 'vue-router';

    export default {
        name: 'AppLink',
        props: {
            ...RouterLink.props,
        },
        computed: {
            isExternal() {
                return typeof this.to === "string"  && this.to.startsWith('http');
            }
        }
        
    }
</script>
