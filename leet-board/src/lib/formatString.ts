

const formatString = (str: string)=>{

    return str.replace(/\n/g, '</p><p>')
        .replace(/Example \d+:/g, match => `<h2 class="text-xl font-semibold mt-4 mb-2">${match}</h2>`)
        .replace(/Input: /g, '<strong class="text-blue-600 dark:text-blue-400">Input: </strong>')
        .replace(/Output: /g, '<strong class="text-green-600 dark:text-green-400">Output: </strong>')
        .replace(/Explanation: /g, '<strong class="text-purple-600 dark:text-purple-400">Explanation: </strong>')
        .replace(/Constraints:/g, '<h2 class="text-xl font-semibold mt-4 mb-2">Constraints:</h2>')
        .replace(/Note:/g, '<h2 class="text-xl font-semibold mt-4 mb-2">Note:</h2>')
        // Style inline code and equations
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        // Style block equations (assuming they're wrapped in double backticks)
        .replace(/``([^`]+)``/g, '<pre class="block-equation">$1</pre>');
}

export default formatString;