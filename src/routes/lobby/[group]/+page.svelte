<script lang="ts">
    export let data
</script>

<h1>Grupo asda</h1>

<h2>Canales</h2>
<ul>
    {#each data.channels as channel}
        <li>{channel.channel_name}</li>
    {/each}
    
</ul>