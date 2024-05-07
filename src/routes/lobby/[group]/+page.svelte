<script lang="ts">
    export let data
</script>

<h1>Grupo asda</h1>

<h2>Canales</h2>
<ul>
    {#each data.channels as channel}
        <a href={`/lobby/${data.groupId}/${channel.id}`}>
            <li>{channel.channel_name}</li>
        </a>
    {/each}
    
</ul>