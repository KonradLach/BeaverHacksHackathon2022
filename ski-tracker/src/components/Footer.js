import "../style/Skiresortcard.css"
import React from "react";

function Footer() {
    return(

<footer className="bg-zinc-100 dark:bg-gray-900">
    <h1 className="text-gray-600 font-bold text-center text-lg">Created By:</h1>
    <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4 text-center">
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Konrad Lach</h2>
            <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                    <a href="https://github.com/KonradLach" className=" hover:underline" target="_blank">GitHub</a>
                </li>
                <li className="mb-4">
                    <a href="https://www.linkedin.com/in/konrad-lach-338571169/" target="_blank" className="hover:underline">LinkedIn</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Isaac Best</h2>
            <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                    <a href="https://github.com/Isaac-Best" className="hover:underline" target="_blank">GitHub</a>
                </li>
                <li className="mb-4">
                    <a href="https://www.linkedin.com/in/isaac-best-26b4ba238/" className="hover:underline" target="_blank">LinkedIn</a>
                </li>

            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Derrick Macaranas</h2>
            <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                    <a href="https://github.com/DerrickMac" className="hover:underline" target="_blank">GitHub</a>
                </li>
                <li className="mb-4">
                    <a href="https://www.linkedin.com/in/derrick-m-ab795224/" className="hover:underline" target="_blank">LinkedIn</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Luck Tran</h2>
            <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                    <a href="https://github.com/lucktran" className="hover:underline" target="_blank">GitHub</a>
                </li>
                <li className="mb-4">
                    <a href="https://www.linkedin.com/in/lucktran/" className="hover:underline" target="_blank">LinkedIn</a>
                </li>
            </ul>
        </div>
    </div>

</footer>

    )
}
export default Footer;
