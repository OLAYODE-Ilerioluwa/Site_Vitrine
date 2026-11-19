import { Mail,Phone,MapPin } from "lucide-react";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { cn } from "../lib/utils";
import { Send } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";



export const Contact = () =>{
    const { toast} = useToast();
    const[isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);

        try {
                const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.get("firstName"),
                    lastName: formData.get("lastName"),
                    email: formData.get("email"),
                    message: formData.get("message"),
                    company: formData.get("company"),
                }),
            });
            if (!response.ok) throw new Error("Échec de l'envoi");

            toast({
                title: "Message envoyé!",
                description: "Merci pour votre message. Je vous contacte au plus vite",
            });
            e.target.reset();
        } catch {
        toast({
            title: "Erreur",
            description: "Le message n'a pas pu être envoyé, réessayez plus tard.",
        });
    } finally {
        setIsSubmitting(false);
    }
        
        
 };
    return ( 
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center"> Contactez <span className="text-primary"> moi </span></h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Avez-vous un projet en tête ou souhaitez-vous une collaboration ? N'hésitez pas à me contacter.
                Je suis ouvert à toute discussion visant une opportunité.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
                <div className="space-y-8">
                    <h3>Information contact</h3>

                    <div className="space-y-6 justify-center">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Mail className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Email</h4>
                                <a href="mailto:iolayode@outlook.fr" className="text-muted-foreground  hover:text-primary transition-colors">
                                    iolayode@outlook.fr
                                </a>
                            </div>

                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Phone className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Téléphone</h4>
                                <a href="tel:+33633231591" className="text-muted-foreground  hover:text-primary transition-colors">
                                    +33 6 33 23 15 91
                                </a>
                            </div>

                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <MapPin className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Lieu</h4>
                                <a  className="text-muted-foreground hover:text-primary transition-colors">
                                    Île-de-France, France
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="pt-8">
                        <h4 className="font-medium mb-4">Suivez-<span className="text-primary">moi</span> </h4>
                        <div className="flex space-x-4 justify-center">
                            <a href="https://www.linkedin.com/in/ileri-olayode" target="_blank">
                                <BsLinkedin/>
                            </a>
                            <a href="https://x.com/nvxlfr" target="_blank" rel="noreferrer">
                                <BsTwitter/>
                            </a>
                            <a href="" target="">
                                <BsInstagram/>
                            </a>
                            
                        </div>

                    </div>

                </div>

                <div className="bg-card p-8 rounded-lg shadow-xs">
                    <h3 className="text-2xl font-semibold mb-6">Envoyez-moi un message</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot anti-spam : invisible pour les humains */}
                        <div className="hidden" aria-hidden="true">
                            <label htmlFor="company">Ne pas remplir</label>
                            <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium mb-2"> Prénom </label>
                            <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            placeholder="Votre prénom..." 
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium mb-2"> Nom </label>
                            <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            placeholder="Votre nom..." 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2"> Mail </label>
                            <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-md border border-input  bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                            placeholder="*****@gmail.com" 
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2"> Message </label>
                            <textarea  id="message" name="message" required className="w-full px-4 py-3 rounded-md border border-input  bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                            placeholder="Expliquez-moi votre projet" 
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting} className={cn("cosmic-button w-full flex items-center justify-center gap-2",

                        )}>
                            {isSubmitting ? "En cours..." : "Envoyer un message"}
                            <Send size={16}/>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </section>

    );
};