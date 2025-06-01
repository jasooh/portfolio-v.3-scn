// homepage
// it's the homepage.

// icons
import {FaGithub} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";
import {IoDocumentOutline} from "react-icons/io5";
import {FaArrowDownLong} from "react-icons/fa6";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

// components

export default function Home() {
    return (
        <main className="px-[10%]">
            <section className="flex relative items-center h-screen">
                <div className="flex flex-col gap-10">
                    <header>
                        <p>hey, i&#39;m</p>
                        <h1 className="relative font-bold text-6xl leading-20 tracking-wide">
                            <span className="absolute inset-0 blur-xs">justin abuyuan.</span>
                            <span className="relative z-10">justin abuyuan.</span>
                        </h1>
                        <h2 className="text-xl leading-10">software engineering @ uwaterloo</h2>
                        <p className="text-gray-400">i like to code stuff and build things that solve problems.</p>
                    </header>

                    {/* social buttons */}
                    <section className="flex flex-row gap-4 opacity-75">
                        <FaGithub className="size-10"/>
                        <FaLinkedin className="size-10"/>
                        <IoDocumentOutline className="size-10"/>
                    </section>
                </div>
                <div className="absolute flex justify-center bottom-10 w-full">
                    <FaArrowDownLong
                        className="opacity-50 animate-bounce size-5"/>
                </div>
            </section>

            {/* projects */}
            <section className="flex flex-col gap-10 h-screen py-[10%]">
                <div>
                    <h2 className="text-2xl font-bold">projects.</h2>
                    <p className="text-gray-400">my best ideas expressed in code.</p>
                </div>

                {/* TODO: Make this project card into a component */}
                <div className="h-full grid grid-cols-3">
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link">Sign Up</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="h-full">

                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link">Sign Up</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="h-full">

                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link">Sign Up</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent className="h-full">

                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* experience */}
            <section className="flex gap-5 h-screen py-[10%]">
                <div>
                    <h2 className="text-2xl font-bold">experience.</h2>
                    <p className="text-gray-400">proof of my abilities.</p>
                </div>
            </section>
        </main>
    );
}
