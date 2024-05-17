<script lang="ts">
    export let data
    </script>
    
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-4xl font-bold mb-4">Este es tu perfil</h1>
    
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <p id="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{data.user.username}</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <p id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{data.user.email}</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                </label>
                <p id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{data.user.name}</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
                    Last Name
                </label>
                <p id="lastname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{data.user.lastname}</p>
            </div>
        </div>
    </div>
    