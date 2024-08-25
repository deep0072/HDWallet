import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"




const SeedGrid = ({words}) => {
  return (

  <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    
    <AccordionTrigger className="flex justify-center text-white">Is it accessible?</AccordionTrigger>
    <AccordionContent>
    
      <div className="grid grid-cols-3 gap-4 blur-lg  hover:blur-none brightness-150">
        {words && words.map(word => <div className="border border-green-500 rounded-md text-white">{word}</div>)}
    

    
   
    
    
  

</div>
    </AccordionContent>
  </AccordionItem>
</Accordion>


  );
};

export default SeedGrid