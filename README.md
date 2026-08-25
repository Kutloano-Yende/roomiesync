# RoomieSync

## Overview

RoomieSync is an **integrated student co-living platform** designed to solve the growing housing friction among students and young professionals in South Africa.

The platform combines three core features:
- **AI-Powered Roommate Matching**: Data-driven compatibility scoring to pair students based on lifestyle alignment
- **Secure In-App Communication**: Private, safe messaging between matched roommates before and during co-living
- **Shared Expense Tracking**: Automated ledger for household cost management and financial transparency

## Problem Statement

Students placed in shared housing face three compounding problems:

1. **Personality Clashes**: No professional mechanism vets housemate compatibility, resulting in lifestyle conflicts around sleep schedules, study habits, and social behavior
2. **Expense Disputes**: Shared costs are tracked informally or not at all, creating financial tension and mistrust
3. **Poor Communication**: No dedicated, safe communication channel exists between matched students, forcing reliance on general social media

RoomieSync addresses all three simultaneously for the South African student accommodation market.

## Vision

To eliminate lifestyle-based housing conflicts through data-driven matching by September 2026, becoming the primary platform for co-living arrangements in major urban centers.

## Project Status

**Status**: Initial repository setup  
**Target Launch**: September 2026  
**Team**: 1 Lead Developer (self-managed)

## Repository Structure

```
roomiesync/
├── mobile/          # React Native mobile application (iOS/Android)
├── backend/         # Python FastAPI backend and AI/ML services
├── ml/              # Machine learning models and compatibility algorithms
├── docs/            # Project documentation and specifications
├── tests/           # Automated test suites
├── .github/         # GitHub workflows and configuration
└── README.md        # This file
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Mobile Frontend | React Native | iOS & Android student-facing UI |
| Backend API | Python (FastAPI) | Business logic and AI model serving |
| AI/ML | Scikit-learn / TensorFlow | Compatibility matching algorithm |
| Database | PostgreSQL | Student profiles, matches, expenses, messages |
| Authentication | Firebase Auth | Secure login and verification |
| Cloud Hosting | Render | Backend API deployment |
| Version Control | GitHub | Source code management |

## Core Features

### Student-Facing
- Register with university credentials and complete lifestyle profile
- Discover AI-ranked roommate matches with compatibility percentages
- Understand why matches are suggested (top 3 matching factors)
- Send roommate requests and secure chat with matches
- Log and track shared household expenses
- Rate co-living experience and provide feedback
- Report conflicts and ensure identity safety
- Control privacy of sensitive information (gender identity, pronouns)

### Administrator-Facing
- View AI-generated match suggestions for room assignments
- Receive alerts for conflict escalation
- Manage student housing assignments

## Requirements

All project requirements are specified in three authoritative documents:

1. **Project Proposal** (`docs/Project_Proposal_2026.pdf`)
   - Business problem, opportunity, vision, goals, scope, deliverables

2. **Technical Specification** (`docs/Technical_Requirements.pdf`)
   - Functional and non-functional requirements, user stories, AI/ML specifications, database design, testing requirements

3. **UI Prototype** (`docs/UI_Prototype.pdf`)
   - 15 screen designs with navigation flows and inclusive design annotations

**Note**: These documents define the complete specification for RoomieSync. All contradictions, unresolved requirements, and design decisions are preserved as documented and require clarification during development.

## Key Constraints & Requirements

- **Deadline**: September 2026 (capture academic calendar window)
- **Launch Target**: 10,000 verified student users within 6 months
- **Performance**: Match scores returned within 3 seconds; dashboard loads within 2 seconds
- **Reliability**: 99% uptime during academic term periods
- **Security**: AES-256 encryption at rest; HTTPS in transit; row-level database security
- **Compliance**: South Africa's POPIA (Protection of Personal Information Act)
- **Inclusivity**: LGBTQ+ inclusive design with gender identity/pronouns support throughout
- **Scalability**: Support up to 5,000 concurrent users; Docker containerization for scaling

## Development Approach

- **Methodology**: Agile development sprints
- **Architecture**: Modular, integrated components (matching, chat, expenses, analytics)
- **Testing**: Automated unit tests (70%+ core backend coverage), integration testing, bias testing for ML model

## Success Metrics

1. **User Acquisition**: 10,000 verified users in first 6 months
2. **Match Quality**: 4/5 star satisfaction rating from 80% of matched users
3. **Financial Tracking**: R500,000 in shared expenses processed within first year
4. **Technical Success**: Zero security incidents; high match retention (6+ months)
5. **On-Time Delivery**: Project completion by September 2026

## Getting Started

This repository is under active setup. Development will follow once all specifications are clarified and confirmed.

### Current Phase
- ✅ Repository structure initialized
- ⏳ Specifications review and clarification
- ⏳ Development environment setup
- ⏳ Backend architecture implementation
- ⏳ Mobile application development
- ⏳ AI/ML model implementation
- ⏳ Testing and deployment

## Documentation

Detailed project requirements, wireframes, database schemas, and API specifications are in `/docs`.

## Contact & Contribution

**Project Lead**: BT Masilela (221592280)  
**Institution**: Tshwane University of Technology  
**Subject**: ISJ107V - Integrated Software Project

---

**RoomieSync**: Transforming student co-living through data-driven compatibility matching.
