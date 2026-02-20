"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, RefreshCcw, CheckCircle2 } from "lucide-react";

const PRESCRIPTIONS = [
  { id: 1, drug: "Amoxicillin", dosage: "500mg", frequency: "3 times a day", status: "Active", refills: 1 },
  { id: 2, drug: "Lisinopril", dosage: "10mg", frequency: "Once daily", status: "Active", refills: 3 },
  { id: 3, drug: "Ibuprofen", dosage: "400mg", frequency: "Every 6 hours as needed", status: "Completed", refills: 0 },
];

export function PrescriptionList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-accent flex items-center gap-2">
          <Pill className="h-5 w-5" /> Active Prescriptions
        </h3>
      </div>
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PRESCRIPTIONS.map((p) => (
              <TableRow key={p.id} className="group transition-colors">
                <TableCell className="font-medium">
                  <div>{p.drug}</div>
                  <div className="text-xs text-muted-foreground">{p.frequency}</div>
                </TableCell>
                <TableCell>{p.dosage}</TableCell>
                <TableCell>
                  <Badge 
                    variant={p.status === 'Active' ? 'default' : 'secondary'}
                    className={p.status === 'Active' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                  >
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {p.status === 'Active' ? (
                    <Button variant="ghost" size="sm" className="h-8 text-accent hover:text-accent hover:bg-primary/20">
                      <RefreshCcw className="h-4 w-4 mr-1" /> Refill ({p.refills})
                    </Button>
                  ) : (
                    <div className="flex items-center justify-end text-muted-foreground text-xs pr-2">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> Finished
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}