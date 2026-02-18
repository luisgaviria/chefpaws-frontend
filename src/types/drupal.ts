// 1. Define the nested items first
export interface FeatureItem {
  field_headline: string;
  field_description: string;
}

// 2. Create one single Section interface
export interface Section {
  // This allows ONLY these two strings, preventing typos
  type: "paragraph--hero" | "paragraph--features_grid";
  content: {
    // Optional properties (?) because a Hero won't have a Section Title,
    // and a Grid won't have a Subtitle.
    field_title?: string;
    field_subtitle?: string;
    field_section_title?: string;
    features?: FeatureItem[];
  };
}

// 3. Define the overall API response
export interface HomepageResponse {
  title: string;
  sections: Section[];
}
