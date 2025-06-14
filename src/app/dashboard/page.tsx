"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { expenseServices } from "@/services/expenseServices";
import { budgetServices } from "@/services/budgetServices";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface ExpenseSummary {
  total_amount: string;
  average_amount: string;
  by_category: Array<{
    category_name: string;
    total_amount: string;
  }>;
}

interface BudgetCategory {
  category_id: number;
  category_name: string;
  budget_amount: string;
  total_spent: string;
  percent: number;
  status: "on_track" | "warning" | "exceeded";
}

interface BudgetStatus {
  summary: {
    total_budget: string;
    percent: number;
  };
  categories: BudgetCategory[];
}

interface ChartData {
  name: string;
  amount: number;
}

interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  message: string | null;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);
  const currentDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryResponse, budgetResponse] = await Promise.all([
          expenseServices.getExpenseSummary({
            start_date: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              1
            )
              .toISOString()
              .split("T")[0],
            end_date: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0
            )
              .toISOString()
              .split("T")[0],
          }),
          budgetServices.getBudgetStatus(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1
          ),
        ]);

        if (summaryResponse.status === "success") {
          setSummary(summaryResponse.data);
        }
        if (budgetResponse.status === "success") {
          setBudgetStatus(budgetResponse.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData: ChartData[] =
    summary?.by_category?.map((item) => ({
      name: item.category_name,
      amount: parseFloat(item.total_amount),
    })) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengeluaran Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary ? formatCurrency(summary.total_amount) : "Rp 0"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rata-rata Pengeluaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary ? formatCurrency(summary.average_amount) : "Rp 0"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Anggaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {budgetStatus
                ? formatCurrency(budgetStatus.summary.total_budget)
                : "Rp 0"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Persentase Penggunaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {budgetStatus
                ? `${budgetStatus.summary.percent.toFixed(1)}%`
                : "0%"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Pengeluaran per Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) =>
                    formatCurrency(value.toString())
                  }
                />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Budget Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status Anggaran per Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetStatus?.categories.map((category) => (
              <div key={category.category_id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{category.category_name}</span>
                  <span>
                    {formatCurrency(category.total_spent)} /{" "}
                    {formatCurrency(category.budget_amount)}
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all",
                      category.status === "exceeded"
                        ? "bg-destructive"
                        : category.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-primary"
                    )}
                    style={{ width: `${Math.min(category.percent, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
