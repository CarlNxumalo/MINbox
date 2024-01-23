<script>
    import { Section, Content, ContentWithImage } from "flowbite-svelte-blocks";
    import { ChevronRightSolid } from "flowbite-svelte-icons";
</script>
    
<Section name="contact">
    <Content>
    <svelte:fragment slot="h2">Hello Owen, Ceate a student account when you sign up</svelte:fragment>
    <p class="mb-4 font-light">Please remember to verify you email with the link sent to your email address.</p>
    <a href="/signup" class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
        Sign Up
        <ChevronRightSolid class="ml-2" size="xs" />
    </a>
    </Content>
</Section>