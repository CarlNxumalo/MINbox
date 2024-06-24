<script>
    import { Section, Content, ContentWithImage } from "flowbite-svelte-blocks";
    import { Heading, P, A } from 'flowbite-svelte';
    import { ChevronRightOutline } from "flowbite-svelte-icons";
</script>
    
<Section name="contact">
    <Content>
        <Heading tag="h2" customSize="text-4xl font-extrabold ">Welcome to MIN-BOX</Heading>
        <P class="my-4 text-gray-500">MIN-BOX is an innovative web-based academic communication tool designed to streamline interactions between students and lecturers. Developed with SvelteKit, MIN-BOX addresses the issue of repeated student messages by creating a public mailbox system. This allows students to view previously sent messages, reducing duplicate inquiries.</P>
        <P class="mb-4">Our advanced NLP search functionality, powered by the sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2 API, helps students find and display similar messages quickly and easily. By minimizing message redundancy, MIN-BOX improves communication efficiency, ensuring a smoother and more effective academic experience for both students and lecturers.</P>
        <A href="/signup">
          Sign Up Today
          <ChevronRightOutline class="w-3.5 h-3.5 ms-2" />
        </A>
    </Content>
</Section>