<script>
    import { Section, Contact } from 'flowbite-svelte-blocks';
    import { Search, Modal, Hr, Label, Input, Textarea, Button, Select, Checkbox, Card } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
    import { enhance } from '$app/forms';
    export let data;
</script>

<Section name="contact">
    <div class="flex gap-2">
        <Search size="md" />
        <Button class="!p-2.5">
          <SearchOutline class="w-5 h-5" />
        </Button>
    </div>
    <div class="flex gap-2">
        <Select name="moduleS" items={data.modules} class="mt-2" placeholder="Filter by module"/>
        <Button class="mt-2" href="/student/email" outline>Email</Button>
    </div>
    
    {#each data.messages as m}
    <div style="display: flex; align-items:center; flex-direction: column;">
    <Card class="w-full max-w-3xl mt-2" style="box-sizing: border-box; width: 100%; padding:1rem"  href="./student/email/{m.id}" data-sveltekit-preload-data>
        <div class="flex" style="display: flex; justify-content:space-between; align-items:baseline">
            <h6 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{m.subject}</h6>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{m.module_code}</p>
        </div>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight truncate">Message: {m.message}</p>
        {#if m.reply}
        <hr style="margin: 0.4rem;">
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight truncate">Reply: {m.reply}</p>
        {/if}
    </Card>
    </div>
    {/each}
</Section>


