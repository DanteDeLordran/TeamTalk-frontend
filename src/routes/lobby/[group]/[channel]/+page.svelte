<script lang="ts">
    import type { MessageRequest } from '../../../../api/models/message.js';

    export let data;

    let message = ''

    const createNewMessage = async() => {
        const messageRequest : MessageRequest = {
            user_id : data.userId,
            message : message,
            channel_id: data.channelId
        }

        const response = await fetch('http://localhost:8000/messages/send',{
                method: 'POST',
                body: JSON.stringify(messageRequest),
                headers: {
                    "Content-Type": "application/json",
                    token: data.token
                },
            })

    }

</script>

<h1>Channel name</h1>
<hr />

<div class="px-6">
    {#if data.messages.length == 0}
        <div>Sin mensajes , sé el primero en escribir !</div>
    {:else}
        <ul class="text-cyan-50">
            {#each data.messages as message}
                <li
                    class:text-left={message.user_id !== data.userId}
                    class:text-right={message.user_id == data.userId}
                >
                    <div>
                        <span>{message.user_id}</span>
                        <p>{message.message}</p>
                        <span>{message.createdAt}</span>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
<div>
    <input type="text" placeholder="Write a message" bind:value={message}/>
    <button class="text-cyan-50" disabled={message.length == 0} on:click={createNewMessage}>Send</button>
</div>
