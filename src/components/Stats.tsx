// Stats Component - Shows Supabase-backed app metrics
import React, { useState, useEffect } from 'react';
import { Heart, Link2, Eye, Users } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Stats {
  totalLinksCreated: number;
  totalLinksShared: number;
  totalViews: number;
  activeLinks: number;
}

export const StatsDisplay: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalLinksCreated: 0,
    totalLinksShared: 0,
    totalViews: 0,
    activeLinks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get all valentines count
        const { count: totalCount } = await supabase
          .from('valentines')
          .select('*', { count: 'exact', head: true });

        // Get sent valentines count
        const { count: sentCount } = await supabase
          .from('valentines')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent');

        // Get total views 
        const { data: viewData } = await supabase
          .from('valentines')
          .select('view_count');

        const totalViews = viewData?.reduce((acc, v) => acc + (v.view_count || 0), 0) || 0;

        setStats({
          totalLinksCreated: totalCount || 0,
          totalLinksShared: sentCount || 0,
          totalViews,
          activeLinks: totalCount || 0
        });
      } catch (e) {
        console.error('Error fetching stats:', e);
      }
      setLoading(false);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: Heart,
      value: stats.totalLinksCreated,
      label: 'Valentines Created',
      color: 'text-[#D56A6A]',
      bg: 'bg-[#D56A6A]'
    },
    {
      icon: Link2,
      value: stats.totalLinksShared,
      label: 'Links Shared',
      color: 'text-[#7CB87C]',
      bg: 'bg-[#7CB87C]'
    },
    {
      icon: Eye,
      value: stats.totalViews,
      label: 'Total Views',
      color: 'text-[#9370DB]',
      bg: 'bg-[#9370DB]'
    },
    {
      icon: Users,
      value: stats.activeLinks,
      label: 'Active Links',
      color: 'text-[#DAA520]',
      bg: 'bg-[#DAA520]'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="lovelink-card p-4 text-center animate-float"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className={`w-10 h-10 rounded-full ${item.bg}/10 mx-auto mb-2 flex items-center justify-center`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <div className="text-2xl font-bold text-[#2B1E1A]">
            {loading ? '...' : item.value.toLocaleString()}
          </div>
          <div className="text-xs text-[#7A6B63]">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;
