"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Navbar from "@/app/components/Navbar";
import {
  CATEGORIES,
  Category,
  rowsInRange,
  SalesRow,
} from "@/lib/dashboard-data";

const ranges = [7, 30, 90] as const;

function money(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function shortDate(iso: string) {
  const [, month, day] = iso.split("-");
  return `${month}/${day}`;
}

function sum(rows: SalesRow[], key: keyof SalesRow) {
  return rows.reduce((total, row) => total + Number(row[key]), 0);
}

export default function DashboardClient() {
  const [days, setDays] = useState<(typeof ranges)[number]>(30);
  const [category, setCategory] = useState<Category | "All">("All");

  const rows = useMemo(() => rowsInRange(days, category), [days, category]);

  const revenue = sum(rows, "revenue");
  const orders = sum(rows, "orders");
  const itemsSold = sum(rows, "itemsSold");
  const cartItems = sum(rows, "cartItems");
  const delivered = sum(rows, "delivered");
  const averageOrder = orders > 0 ? Math.round(revenue / orders) : 0;

  const byDate = useMemo(() => {
    const map = new Map<
      string,
      { date: string; revenue: number; orders: number; delivered: number }
    >();
    for (const row of rows) {
      const current = map.get(row.date) ?? {
        date: row.date,
        revenue: 0,
        orders: 0,
        delivered: 0,
      };
      current.revenue += row.revenue;
      current.orders += row.orders;
      current.delivered += row.delivered;
      map.set(row.date, current);
    }
    return [...map.values()].sort((a, b) => a.date.localeCompare(b.date));
  }, [rows]);

  const byCategory = useMemo(() => {
    return CATEGORIES.map((name) => ({
      category: name,
      revenue: rows
        .filter((row) => row.category === name)
        .reduce((total, row) => total + row.revenue, 0),
    })).filter((entry) => entry.revenue > 0);
  }, [rows]);

  const busiest = useMemo(() => {
    return [...byDate].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [byDate]);

  const kpis = [
    { label: "Revenue", value: money(revenue) },
    { label: "Orders", value: orders.toLocaleString("en-US") },
    { label: "Items sold", value: itemsSold.toLocaleString("en-US") },
    { label: "Avg. order value", value: money(averageOrder) },
    { label: "Items in carts", value: cartItems.toLocaleString("en-US") },
    { label: "Items delivered", value: delivered.toLocaleString("en-US") },
  ];

  return (
    <>
      <Navbar bg="white" />
      <div className="overflow-hidden bg-black py-3 text-sm font-medium tracking-wide text-white sm:text-base">
        <span className="demo-banner-text">
          This dashboard is public for demos.
        </span>
      </div>
      <main className="w-full px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sample store activity for the selected range.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setDays(range)}
                className={`rounded-full px-4 py-1.5 text-sm ${
                  days === range
                    ? "bg-black text-white"
                    : "border border-gray-300 text-gray-800"
                }`}
              >
                {range} days
              </button>
            ))}
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as Category | "All")
              }
              className="rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-800"
            >
              <option value="All">All categories</option>
              {CATEGORIES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-[#F1F3F2] p-4">
              <p className="text-sm text-gray-600">{kpi.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Revenue
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={byDate}>
                  <CartesianGrid stroke="#eee" />
                  <XAxis dataKey="date" tickFormatter={shortDate} />
                  <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip
                    formatter={(value) => money(Number(value))}
                    labelFormatter={(label) => String(label)}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#111"
                    fill="#d6d6d6"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Orders and deliveries
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byDate}>
                  <CartesianGrid stroke="#eee" />
                  <XAxis dataKey="date" tickFormatter={shortDate} />
                  <YAxis />
                  <Tooltip labelFormatter={(label) => String(label)} />
                  <Bar dataKey="orders" fill="#111" name="Orders" />
                  <Bar dataKey="delivered" fill="#C19A83" name="Delivered" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-gray-200 p-4">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Sales by category
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory}>
                <CartesianGrid stroke="#eee" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => money(Number(value))} />
                <Bar dataKey="revenue" fill="#111" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Busiest days
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F1F3F2] text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Orders</th>
                  <th className="px-4 py-3 font-semibold">Revenue</th>
                  <th className="px-4 py-3 font-semibold">Delivered</th>
                </tr>
              </thead>
              <tbody>
                {busiest.map((day) => (
                  <tr key={day.date} className="border-t border-gray-100">
                    <td className="px-4 py-3">{day.date}</td>
                    <td className="px-4 py-3">{day.orders}</td>
                    <td className="px-4 py-3">{money(day.revenue)}</td>
                    <td className="px-4 py-3">{day.delivered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
