<script lang="ts">
    import AppHeader from '../components/Globals/AppHeader.svelte';
import type { PageData } from './$types';
    import RegisterCard from './RegisterCard.svelte';
    
    export let data: PageData;


    function goLogin(event: MouseEvent): void {
        if (event.button === 0) {
            window.open('/', '_self');
        }
    }
</script>

<AppHeader onClickHeaderElement={goLogin}/>
<main>
    <div>
        <RegisterCard />
    </div>
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    div {
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
        background-color: rgba(185, 185, 185, 0.253);
        width: fit-content;
        padding: 16px;
        border-radius: 16px;
        transition: all 200ms;
        backdrop-filter: blur(10px);
    }
    div:hover {
        box-shadow: 0 0 20px rgb(167, 40, 252);
        background-color: rgba(137, 107, 184, 0.253);
    }
</style>