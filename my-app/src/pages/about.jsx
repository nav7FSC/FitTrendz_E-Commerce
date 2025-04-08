import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";

export default function About() {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const styles = {
        container: {
            maxWidth: "900px",
            margin: "0 auto",
            padding: "60px 20px",
            textAlign: "center",
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0px)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease"
        },
        title: {
            fontSize: "2.75rem",
            fontWeight: "700",
            marginBottom: "30px",
            color: "#222",
            letterSpacing: "1px",
            transition: "color 0.3s ease"
        },
        text: {
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "26px",
            color: "#444",
            transition: "color 0.3s ease"
        },
        paragraphHover: {
            cursor: "default"
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.title}>About FitTrendz</h1>
                <p style={{ ...styles.text, ...styles.paragraphHover }}>
                    At FitTrendz, we believe that everyone deserves to look good and feel confident in what they wear — no matter their shape or size.
                    That’s why we’ve built our store around one simple promise: the right fit for every body.
                </p>
                <p style={{ ...styles.text, ...styles.paragraphHover }}>
                    We specialize in high-quality, stylish apparel that fits real people. From petite to plus, athletic to curvy,
                    our wide range of sizes ensures that you can shop without compromise. No more guessing, no more settling —
                    just clothes that are made to move with you and look great doing it.
                </p>
                <p style={{ ...styles.text, ...styles.paragraphHover }}>
                    FitTrendz is more than just a brand — it’s a movement towards inclusive, body-positive fashion that celebrates individuality.
                    Because when your clothes fit right, everything feels right.
                </p>
            </div>
            <Footer />
        </>
    );
}