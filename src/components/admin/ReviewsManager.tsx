import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Star, Check, X } from 'lucide-react';

interface Review {
  id: string;
  client_name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export const ReviewsManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_approved: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: currentStatus ? 'Avaliação ocultada' : 'Avaliação aprovada',
      });

      fetchReviews();
    } catch (error) {
      toast({
        title: 'Erro ao atualizar',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Carregando avaliações...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Avaliações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Nenhuma avaliação encontrada</p>
          ) : (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{review.client_name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-primary text-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <Badge variant={review.is_approved ? 'default' : 'secondary'}>
                      {review.is_approved ? 'Aprovada' : 'Pendente'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{review.comment}</p>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={review.is_approved ? 'outline' : 'default'}
                      onClick={() => toggleApproval(review.id, review.is_approved)}
                    >
                      {review.is_approved ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Ocultar
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Aprovar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
