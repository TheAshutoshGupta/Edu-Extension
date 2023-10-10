<template>
  <div>
    <button type="button" @click="makeFetchRequest()">{{ apiCallData }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const apiCallData = ref();

const makeFetchRequest = () => {
  // Add the fetch request here
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs && tabs.length > 0) {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id) {
        console.log('Sending replaceHeaders message to tab ' + activeTab.id);
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: replaceTextElements
        });
      } else {
        console.error("Error: Invalid tab object");
      }
    } else {
      console.error("Error: No active tabs found");
    }
  });

  function replaceTextElements() {
    
    const allParagraphs = document.querySelectorAll('p, figcaption, li');
    
    let paragraphText = "";

    allParagraphs.forEach((paragraph) => {
      const paragraphContent = paragraph?.textContent?.trim();
      if (paragraphContent) {
        paragraphText += paragraphContent + "\n";
      }
    });

    console.log(paragraphText);

    paragraphText = "";

    const paragraphs = [];
    // remove all paragraphs that are in a header, footer, or nav element or class is navbox
    // Iterate over the selected elements and filter out unwanted ones
    allParagraphs.forEach((paragraph) => {
      const paragraphContent = paragraph?.textContent?.trim();
      
      // Check if the paragraph is within a <header>, <footer>, or <nav> element or has the class 'navbox'
      const isInHeaderFooterNavOrHasNavbox = paragraph.closest('header, footer, nav') || paragraph.closest('.navbox, .sidebar, .catlinks, .reflist');

      // If the paragraph meets any of the criteria, remove it
      if (paragraphContent && isInHeaderFooterNavOrHasNavbox) {
        // Uncomment the line below to remove the paragraph from the DOM
        // paragraph.remove();
        // paragraphText += paragraphContent + "\n";
      } else if (paragraphContent) {
        paragraphText += paragraphContent + "\n";
        paragraphs.push(paragraph);
      }
    });

    // console.log(paragraphText);

    paragraphs.forEach((paragraph) => {
      const paragraphContent = paragraph?.textContent?.trim();
      if (paragraphContent) {
        console.log(paragraphContent);
      }
    });


    const extractedParagraphs = [];
    const extractedLinks = {};

    const maxCharacters = 3000;
    let totalCharacters = 0;

    paragraphs.forEach((paragraph, index) => {
      const paragraphContent = paragraph?.textContent?.trim();
      const paragraphId = index + 1;
      if (paragraphContent) {

        extractedParagraphs.push({
          id: paragraphId,
          content: paragraphContent
        });

      }

      // extract links
      const links = paragraph.querySelectorAll('a');
      // find links within the paragraph and store their text and href in a dictionary that includes text, link, and paragraph id
      links.forEach((link) => {
        const linkText = link?.textContent?.trim();
        const linkHref = link?.href;
        // if link already exists, add the paragraph id to the list of paragraphs that use it
        if (linkText && linkHref) {
          if (extractedLinks[linkText]) {
            extractedLinks[linkText].paragraphId.push(paragraphId);
          } else {
            extractedLinks[linkText] = { link: linkHref, paragraphId: [paragraphId] };
          }
        }
      });

    });

    // at this point, we want to create groups of paragraphs to send to the LLM
    // we need to create groups to stay under the maximum token count
    // we also want to keep paragraphs together, so we can't split them up

    const groupedParagraphs = [];
    let currentGroup = [];
    extractedParagraphs.forEach((paragraph) => {
      const paragraphLength = paragraph.content.length;
      if (totalCharacters + paragraphLength > maxCharacters) {
        groupedParagraphs.push(currentGroup);
        currentGroup = [];
        totalCharacters = 0;
      }
      currentGroup.push(paragraph);
      totalCharacters += paragraphLength;
    });

    groupedParagraphs.forEach((group) => {
      // console.log("Group")
      // console.log(group);
    });

    // cap groupedParagraphs at 2 groups
    // groupedParagraphs.splice(2);

    
    // send groups to openai
    // loop through groups
    
    groupedParagraphs.forEach((group) => {

      

        // map elements to string to send to openai
      const extractedParagraphsString = group.map((paragraph) => {
        return `${paragraph.id}: ${paragraph.content}`;
      }).join("\n");

      console.log("Input:");
      console.log(extractedParagraphsString);

      // send to openai
      console.log("Sending group to OpenAI");
      const apiKey = "googoo"
      const apiUrl = "https://api.openai.com/v1/chat/completions"

      let prompt = "Hello";
      prompt = "You are a bot that rewrites content. You maintain the format, rewriting the content in place, aiming for a similar number of characters for each section. Maintain the same format as the input, with ids. Keep the same ids. If there is a blank, leave it there. Do NOT add headers or anything else. Please rewrite this content to match a 1st grade reading level:\n"

      prompt += extractedParagraphsString;

      // const response = "1: A big language model (LLM) is a kind of language model known for its ability to understand and generate language in a general way. LLMs achieve this by using lots of data to learn a huge number of parameters during training, and they require a lot of computational resources during training and operation. LLMs are artificial neural networks, mainly Transformers, and they are trained using self-supervised learning and semi-supervised learning.\n2: As language models, they work by taking an input text and predicting the next token or word over and over again. Until 2020, the only way to adapt a model to perform specific tasks was through fine tuning. However, larger models like GPT-3 can be engineered to achieve similar results by providing specific prompts. They are believed to learn about the structure, meaning, and \"ontology\" of human language from the text they are trained on, but they can also pick up inaccuracies and biases present in the training data.\n3: Some notable examples of LLMs include OpenAI's GPT models (such as GPT-3.5 and GPT-4 used in ChatGPT), Google's PaLM (used in Bard), Meta's LLaMa, as well as BLOOM, Ernie 3.0 Titan, and Anthropic's Claude 2.\n4: The process of converting text into numerical tokens involves using a modified version of byte-pair encoding. In this process, all the unique characters, including blanks and punctuation marks, are treated as initial individual units (uni-grams). The most frequent pair of adjacent characters is then merged into a bi-gram, and all instances of that pair are replaced with it. This merging of adjacent pairs of n-grams continues until longer n-grams are formed, and this process is repeated until a vocabulary of a specific size is obtained (in the case of GPT-3, the size is 50257). The token vocabulary consists of integers ranging from zero to the size of the token vocabulary. New words can always be interpreted as combinations of these tokens and initial uni-grams.\n5: The token vocabulary is designed to minimize the number of tokens needed to represent an average English word based on the frequencies extracted from English corpora. However, when an average word from another language is encoded using this English-optimized tokenizer, it may be split into a suboptimal number of tokens.\n6: The tokenizer converts texts into a series of numerical \"tokens\" and may split them in the process.\n7: Probabilistic tokenization, which is achieved through the byte pair encoding algorithm, also helps compress the datasets. Since LLMs require input to be in the form of an array with consistent lengths, shorter texts need to be \"padded\" to match the length of the longest text. The average number of tokens needed per word depends on the language of the dataset.\n9: Reinforcement learning from human feedback (RLHF) is used to further fine-tune a model based on a dataset of human preferences. Algorithms like proximal policy optimization are utilized for RLHF.\n38: GPT-4 has the capability to accept both text and image inputs. On the other hand, Google Gemini is expected to be a multimodal model."
      

      fetch(apiUrl, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+apiKey
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              role: "user",
              content: prompt
            }
          ],
          "temperature": 0.9
        })
      }
      ).then((response) => response.json()
      ).then((responseData) => {
        //console.log(responseData);
        const response = responseData["choices"][0]["message"]["content"]
        console.log("OpenAI Response:");
        console.log(response);
      if (response) {
        const responseParagraphs = response.split("\n");
        console.log(responseParagraphs);
        // create dict of responseParagraph ids and text
        const responseParagraphsDict = {};
        responseParagraphs.forEach((responseParagraph) => {
          const id = responseParagraph.split(': ')[0];
          const splitText = responseParagraph.split(': ');
          // rejoin the rest since there may be more than one colon
          let replacementText = splitText.slice(1).join(': '); 
          responseParagraphsDict[id] = replacementText;
        });
        // replace inner text of text nodes with the response text elements from OpenAI
        paragraphs.forEach((paragraph, index) => {
          
          

          if (responseParagraphsDict[index + 1]) {

            console.log("Original Paragraph " + index + ": " + paragraph.textContent);
            console.log("Replacement Paragraph: " + (index + 1) + ", " + responseParagraphsDict[index + 1])

            let replacementText = responseParagraphsDict[index + 1];

            // go through, and wherever the link text is re-used, replace it with a link
            // Object.keys(extractedLinks).forEach((linkHref) => {
            //   const linkText = extractedLinks[linkHref];
            //   replacementText = replacementText.replaceAll(linkText, `<a href="${linkHref}">${linkText}</a>`);
            // });

            for (const linkText in extractedLinks)
            {
              if(replacementText.includes(linkText))
              {
                // also check if it belongs to same paragraph
                if(extractedLinks[linkText].paragraphId.includes(index + 1)){
                  replacementText = replacementText.replace(linkText, `<a href="${extractedLinks[linkText].link}">${linkText}</a>`)
                }
                
              }
            }

            const realLinks = Object.keys(extractedLinks).filter(linkText => extractedLinks[linkText].paragraphId.includes(index + 1) && !linkText.includes('[') && !linkText.includes(']') && !replacementText.includes(linkText));


            if(realLinks.length > 0) {
              const linksHtmtl = realLinks.map(linkText => `<a href="${extractedLinks[linkText].link}">${linkText}</a>`).join(', ');
              replacementText += "<br><br>Other Links: " + linksHtmtl;
            }
            
            const refLinks = Object.keys(extractedLinks).filter(linkText => extractedLinks[linkText].paragraphId.includes(index + 1) && linkText.includes('[') && linkText.includes(']'));
            if (refLinks.length > 0) {
              const refLinksHtml = refLinks.map(linkText => `<a href="${extractedLinks[linkText].link}">${linkText}</a>`).join(', ');
              replacementText += `<br>References: ${refLinksHtml}`;
            }

            replacementText += "<br>";

            // if(references.length > 0){
            //   const referencesHtml = references.map(reference => reference.textContent).join(', ');
            //   replacementText += "<br>References: " + referencesHtml;
            // }

            paragraph.innerHTML = replacementText;

          }
        });
      }

      }).catch((error) => {
        console.log(error);
      });

    });


    

  }

};
</script>

<style scoped></style>
