import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/client";
import { toast } from "sonner";

export function useCrawlActions() {
  const queryClient = useQueryClient();

  const startCrawl = useMutation({
    mutationFn: (id: number) => api.post(`/api/urls/${id}/start`),
    onSuccess: () => {
      toast.success("Crawl started");
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: () => toast.error("Failed to start crawl"),
  });

  const stopCrawl = useMutation({
    mutationFn: (id: number) => api.post(`/api/urls/${id}/stop`),
    onSuccess: () => {
      toast.success("Crawl stopped");
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: () => toast.error("Failed to stop crawl"),
  });

  return { startCrawl, stopCrawl };
}
