import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type Company = {
    id: number;
    name: string;
    address: string;
    zip: string;
    country: string;
    employeeCount: number;
    industry: string;
    marketCap: number;
    domain: string;
    logo: string;
    ceoName: string;
};

type CompanyStore = {
    companies: Company[];
    setCompanies: (companies: Company[]) => void;
    addCompany: (company: Company) => void;
    updateCompany: (id: number, updatedCompany: Partial<Company>) => void;
    deleteCompany: (id: number) => void;
};

const useCompanyStore = create<CompanyStore>()(
    devtools(
        persist(
            (set) => ({
                companies: [],

                setCompanies: (companies: Company[]) => set(() => ({ companies })),

                addCompany: (company) =>
                    set((state) => ({
                        companies: [...state.companies, company],
                    })),

                updateCompany: (id, updatedCompany) =>
                    set((state) => ({
                        companies: state.companies.map((company) =>
                            company.id === id
                                ? { ...company, ...updatedCompany }
                                : company
                        ),
                    })),

                deleteCompany: (id) =>
                    set((state) => ({
                        companies: state.companies.filter(
                            (company) => company.id !== id
                        ),
                    })),
            }),
            { name: "company-store" }
        )
    )
);

export default useCompanyStore;