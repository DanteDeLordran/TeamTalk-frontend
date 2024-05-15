<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import type { MessageRequest } from '../../../../api/models/message.js';

    export let data;

    let message = ''
    let bottom : HTMLElement

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
        if (response.ok) {
            message = ''
            invalidateAll()
            bottom.scrollIntoView({ behavior: 'smooth' })
        }

    }

</script>

<div class="fixed top-0 w-full bg-slate-800 text-cyan-50" >
    <h1>Channel name</h1>
</div>
<div class="px-6">
    {#if data.messages.length == 0}
        <div>Sin mensajes , sé el primero en escribir !</div>
    {:else}
        <ul class="text-cyan-50 my-9">
            {#each data.messages as message}
                <li class="py-3"
                    class:text-left={message.user_id !== data.userId}
                    class:text-right={message.user_id == data.userId}
                >
                    <div>
                        <span>{message.user_id}</span>
                        <p>{message.message}</p>
                        <span>{new Date(message.createdAt).toLocaleString()}</span>
                    </div>
                </li>
            {/each}
        </ul>
        <div bind:this={bottom}></div>
    {/if}
</div>
<div class="fixed bottom-0 w-full bg-slate-800 text-cyan-50">
    <form on:submit={createNewMessage}>
        <input class="text-black" type="text" placeholder="Write a message" bind:value={message}/>
        <button disabled={message.length == 0} >Send</button>
    </form>
</div>
