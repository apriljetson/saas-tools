// AI Prompt Generator - Core Module
// Generates structured prompts for various use cases

const promptTemplates = {
    content: {
        blog: {
            name: "Blog Post Generator",
            template: "Write a comprehensive blog post about {topic}. Include: compelling title, introduction (hook), {sections} main points with subheadings, practical takeaways, and a call-to-action. Tone: {tone}. Length: {length} words. SEO keywords: {keywords}",
            params: ["topic", "sections", "tone", "length", "keywords"]
        },
        social: {
            name: "Social Media Post",
            template: "Create a {platform} post about {topic}. Include: hook (first line), value proposition, supporting detail, CTA. Tone: {tone}. Add {hashtags} relevant hashtags. Keep under {length} characters.",
            params: ["platform", "topic", "tone", "hashtags", "length"]
        },
        video: {
            name: "Video Script",
            template: "Write a {duration} video script for YouTube about {topic}. Structure: Hook (10s), Problem (30s), Solution ({points} points), CTA. Tone: {tone}. Include on-screen text suggestions.",
            params: ["duration", "topic", "points", "tone"]
        }
    },
    business: {
        email: {
            name: "Professional Email",
            template: "Write a professional email with: Subject: {subject}. Purpose: {purpose}. Key points: {points}. Call to action: {cta}. Tone: {tone}. Keep under {length} words.",
            params: ["subject", "purpose", "points", "cta", "tone", "length"]
        },
        proposal: {
            name: "Business Proposal",
            template: "Create a proposal outline for: {project}. Include: Problem statement, Your solution, Timeline: {timeline}, Pricing: {pricing}, Why you, CTA.",
            params: ["project", "timeline", "pricing"]
        },
        report: {
            name: "Status Report",
            template: "Write a {type} report covering: Progress (green/yellow/red), Key wins, Blockers, Next steps, Requests.",
            params: ["type"]
        }
    },
    technical: {
        codeReview: {
            name: "Code Review Request",
            template: "Review this code for: {language}. Focus on: {focus_areas}. Check for: bugs, security issues, performance, best practices. Provide specific suggestions.",
            params: ["language", "focus_areas"]
        },
        architecture: {
            name: "System Architecture",
            template: "Design a {system_type} system for: {use_case}. Requirements: {requirements}. Constraints: {constraints}. Include: components, data flow, tech stack.",
            params: ["system_type", "use_case", "requirements", "constraints"]
        },
        debug: {
            name: "Debug Helper",
            template: "Help me debug this {language} code. Error: {error}. What I've tried: {attempts}. Expected: {expected}. Provide step-by-step fix.",
            params: ["language", "error", "attempts", "expected"]
        }
    },
    research: {
        analysis: {
            name: "Market Analysis",
            template: "Conduct a {type} analysis on {topic}. Include: Current state, Trends, Key players, Opportunities, Risks, Recommendations.",
            params: ["type", "topic"]
        },
        summary: {
            name: "Document Summary",
            template: "Summarize this {doc_type}: {content}. Extract: Key findings (5), Main conclusions, Action items, Unanswered questions.",
            params: ["doc_type", "content"]
        },
        competitor: {
            name: "Competitor Research",
            template: "Research competitor: {competitor}. For: {market}. Include: Products, Pricing, Strengths, Weaknesses, Market position, Growth strategy.",
            params: ["competitor", "market"]
        }
    },
    personal: {
        creative: {
            name: "Creative Writing",
            template: "Write a {style} piece about {topic}. Tone: {tone}. Include: vivid descriptions, emotional hooks, satisfying conclusion. Target: {audience}.",
            params: ["style", "topic", "tone", "audience"]
        },
        learning: {
            name: "Learning Plan",
            template: "Create a learning plan for {skill}. Current level: {level}. Goal: {goal}. Time available: {time}. Include: milestones, resources, practice exercises.",
            params: ["skill", "level", "goal", "time"]
        }
    }
};

function generatePrompt(category, type, params) {
    const template = promptTemplates[category]?.[type];
    if (!template) return null;
    
    let prompt = template.template;
    template.params.forEach(param => {
        const value = params[param] || `[${param}]`;
        prompt = prompt.replace(new RegExp(`{${param}}`, 'g'), value);
    });
    
    return {
        name: template.name,
        prompt: prompt,
        params: template.params
    };
}

// Example usage:
// generatePrompt('content', 'blog', {
//     topic: 'AI in 2026',
//     sections: '5',
//     tone: 'professional',
//     length: '1500',
//     keywords: 'AI, machine learning, future'
// });

module.exports = { generatePrompt, promptTemplates };