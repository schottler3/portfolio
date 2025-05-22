export interface PdfItem {
    url: string;
}

export interface ProjectItemType {
    index: number;
    start: string;
    end?: string;
    title: string;
    tagline: string;
    description: string[];
    images?: string[];
    video?: string[];
    links?: {
        live?: string;
        git?: string;
    };
    pdfs?: PdfItem[];
}