# Copilot Instructions for Agent 47

## Project Overview

This repository is in its early stages. The `.github` directory contains foundational instructions and prompt files to guide future development and AI agent behavior.

- **Instructions**: `.github/instructions/Instructions.instructions.md` — Project context and coding guidelines for AI agents.
- **Prompts**: `.github/prompts/Agent47.prompt.md` — Custom prompt(s) for agent behavior and task framing.

## Key Conventions

- **All project-specific guidance for AI agents must be placed in `.github/instructions/Instructions.instructions.md`.**  
  Update this file as the project evolves to reflect new architectural decisions, workflows, or conventions.
- **Prompts for agent behavior** should be stored in `.github/prompts/`, named according to the agent or use case.
- **Do not create summary or documentation markdown files for each change** unless explicitly requested.

## AI Agent Guidance

- Always check `.github/instructions/Instructions.instructions.md` for the latest project context and rules before generating or editing code.
- When referencing files or lines, use markdown links as described in the instructions file.
- Avoid generic advice; focus on actionable, project-specific patterns and workflows.
- If a workflow or convention is not documented, prefer updating the instructions file rather than making assumptions.

## Example Patterns

- **Instruction file reference**:  
  See [instructions/Instructions.instructions.md](instructions/Instructions.instructions.md) for coding guidelines.
- **Prompt file reference**:  
  See [prompts/Agent47.prompt.md](prompts/Agent47.prompt.md) for agent prompt structure.

## Next Steps

As the codebase grows, update this file to document:
- Major components and their responsibilities
- Build, test, and debug workflows (with commands)
- Integration points and external dependencies
- Any project-specific code patterns or architectural decisions